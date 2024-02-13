import prisma from "../Db/db.config.js";

export const fetchUsers = async (req,res) => {
  const users = await prisma.user.findMany({
    // include:{
      // Post:true,
      // Comment:true

      // Post:{
      //   select:{
      //     title:true,
      //     comment_count:true
      //   }
      // }
    // }
    select:{
      _count:{
        select:{
          Post:true,
          Comment:true,
        }
      }
    }
  })
  return res.json({status:200,data:users})
}

export const createUser = async (req, res) => {
  const { name, email, pass, role } = req.body;
  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email already taken , please use another email",
    });
  }
  
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      pass: pass,
      role: role,
    },
  });
  return res.json({ status: 200, data: newUser, msg: "User Created" });
};

export const updateUser = async (req, res) => {
  const userId = req.params.id
  const { name, email, pass, role } = req.body;
  await prisma.user.update({
    where:{
      id:Number(userId)
    },
    data:{
      name:name,
      email:email,
      pass:pass,
      role:role
    }
  })
  return res.json({status:200,message:"User Updated Successfully"})
};

export const showUser = async (req,res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where:{
      id:Number(userId)
    }
  })
  return res.json({status:200,data:user})
}

export const deleteUser = async (req,res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where:{
      id:Number(userId)
    }
  })
  return res.json({status:200,msg:"User deleted successfully"})
}