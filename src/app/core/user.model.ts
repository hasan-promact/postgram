export class FirebaseUserModel {
  uid:string;
  image: string;
  name: string;
  email: string;
  provider: string;

  constructor(){
    this.uid = "";
    this.image = "";
    this.name = "";
    this.email = "";
    this.provider = "";
  }
}
