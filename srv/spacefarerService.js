module.exports = (srv) => {
  srv.after('CREATE', 'Spacefarers', (data, req) => {
    console.log(`New spacefarer created: ${data.name}`);
  });
};