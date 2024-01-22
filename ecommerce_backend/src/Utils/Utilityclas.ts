class Errorhandler extends Error {
  constructor(public messsage: string, public statuscode: number) {
    super(messsage);
    this.statuscode = statuscode;
}
}

export default Errorhandler;
