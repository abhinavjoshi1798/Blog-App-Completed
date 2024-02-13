class ProfileController {
    static async index(req, res) {
      try {
        const user = req.user;
        return res.json({ status: 200, user });
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
    }
  }
  export default ProfileController;
  