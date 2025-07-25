import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { get as ldGet } from 'lodash-es';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_DOMAIN,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const formatRecipient = (name) => {
  const safeName = name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  return `HQ_${safeName}@${process.env.MAIL_DOMAIN}`;
};

const generateAccessCode = (name, originPlanet) => {
  const first = name?.[0]?.toUpperCase() || 'X';
  const planet = originPlanet?.slice(0, 3)?.toUpperCase() || 'XXX';
  const suffix = crypto.randomBytes(4).toString('hex');
  return `${first}${planet}${suffix}`;
};

const validateAccess = async (req, srv) => {
  const isFiori = req.headers['sap-contextid'] || req.headers['x-csrf-token'];
  if (isFiori) return;

  let accessCode;

  if (req.event === 'CREATE') {
    accessCode = req.data?.accessCode;
  } else {
    accessCode = ldGet(req, 'headers.x-access-code');
  }

  if (!accessCode) {
    return req.reject(403, 'Missing accessCode.');
  }

  const found = await SELECT.one.from(srv.entities.Spacefarers).where({ accessCode });

  if (!found || found.IsActiveEntity === false) {
    return req.reject(403, 'Cosmic invader detected! Access denied');
  }

  if (req.event === 'READ') {
    const originPlanet = ldGet(req, 'headers.x-origin-planet');

    if (!originPlanet || found.originPlanet !== originPlanet) {
      return req.reject(403, 'Access denied due to originPlanet mismatch.');
    }
  }
};


export default (srv) => {
  srv.before(['READ', 'UPDATE', 'DELETE'], 'Spacefarers', (req) => validateAccess(req, srv));

  srv.before('CREATE', 'Spacefarers.drafts', (req) => {
    const { wormholeNavigationSkill, name, stardustCollection, originPlanet } = req.data;

    req.data.accessCode = generateAccessCode(name, originPlanet);

    if (wormholeNavigationSkill !== undefined && wormholeNavigationSkill < 5) {
      req.error({
        code: 'LOW_WORMHOLE_SKILL',
        message: `Candidate ${name} must have a wormhole navigation skill of at least 5.`,
        target: 'wormholeNavigationSkill'
      });
    }

    if (stardustCollection !== undefined && stardustCollection !== 0) {
      req.error({
        code: 'NON_NULL_STARDUST_COLLECTION',
        message: `Candidate ${name} must start with 0 stardust collection.`,
        target: 'stardustCollection'
      });
    }
  });

  srv.before('UPDATE', 'Spacefarers.drafts', (req) => {
    if ('accessCode' in req.data) {
      delete req.data.accessCode;
      console.log('Prevented accessCode from being updated.');
    }
  });

  srv.after('CREATE', 'Spacefarers.drafts', async (created) => {
    if (created?.name) {
      const recipient = formatRecipient(created.name);
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: recipient,
        subject: `Welcome Aboard, ${created.name}!`,
        text: `Welcome ${created.name}. Good luck on your space adventures! - Galactic HQ`
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipient}`);
      } catch (err) {
        console.error(`Email failed: ${err.message}`);
        console.log(`Welcome aboard ${created.name}! Please save your access code for entry: ${created.accessCode}`);
      }
    }
  });
};
