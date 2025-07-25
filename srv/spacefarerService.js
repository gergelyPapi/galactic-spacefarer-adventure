import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'egalactic-hq',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const formatRecipient = (name) => {
  const safeName = name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  return `HQ_${safeName}@${process.env.MAIL_DOMAIN}`;
}

export default (srv) => {
  srv.before('CREATE', 'SpacefarerService.Spacefarers.drafts', (req) => {
    const { wormholeNavigationSkill, name, stardustCollection } = req.data;

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

  srv.after('CREATE', 'SpacefarerService.Spacefarers.drafts', async (created) => {
    if(created?.name) {
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
        console.log(`Fallback log: Welcome aboard ${created.name}!`);
      }
    }
  });
};
