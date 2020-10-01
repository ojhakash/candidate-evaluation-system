import AdminModel from "../../Common/Models/Admin";
import Admin from "../../domain/entities/Admin";
import HttpError from "standard-http-error";
import dotenv from "dotenv";

dotenv.config();

export default class AdminRepository {
  constructor() {}

  async registerAdmin(admin: Admin) {
    let model = AdminModel.build({
      email: admin.email,
      name: admin.userName,
      password: admin.password,
    });
    let response = await model.save();
  }

  async verifyAdmin(admin: Admin) {
    let adminObj = await AdminModel.findOne({
      where: {
        email: admin.email,
      },
    });
    adminObj?.set('verified',true)
    await adminObj?.save();
  }

  siginInAdmin() {}

  async getAdminById(email: string) {
    let admin = await AdminModel.findOne({ where: { email } });
    if (admin === null) {
      throw new HttpError(404, "user not found for this email");
    }
    let userEmail: any = admin?.get("email");
    let hashedPassword: any = admin?.get("password");
    let name: any = admin?.get("name");
    let adminId: any = admin?.get("admin_id");
    let user = new Admin(name, userEmail, "", hashedPassword);
    user.adminId = adminId;
    return user;
  }
}
