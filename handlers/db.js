module.exports = function({ DB_URI, mongoose }) {
  mongoose.connect(DB_URI + 'auth').then(() => {
    console.log('DB successfully connected!');
  });
}