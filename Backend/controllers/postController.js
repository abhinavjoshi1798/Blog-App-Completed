import prisma from "../Db/db.config.js";

export const fetchPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0 || limit > 100) {
    limit = 6;
  }

  const skip = (page - 1) * limit;
  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
    include: {
      user: {
        select: {
          name: true,
        },
      },
      comment: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      },
    },
    orderBy: {
      id: "desc",
    },
    // where:{
    //   comment_count:{
    //     gt:0
    //   }
    // title:{
    // startsWith:"next",
    // endsWith:"js"
    // equals:"next js"

    // }
    // AND:[
    //   {
    //     title:{
    //       startsWith:"next"
    //     }
    //   },
    //   {
    //     title:{
    //       endsWith:"js"
    //     }
    //   }
    // ]
    // }
  });
  const totalPosts = await prisma.post.count();
  const totalPages = Math.ceil(totalPosts/limit);

  return res.json({ status: 200, data: posts, meta:{
    totalPages,
    currentPage:page,
    limit:limit
  } });
};

export const createPost = async (req, res) => {
  const { user_id, image, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      image: image,
      title: title,
      description: description,
    },
  });
  return res.json({ status: 200, data: newPost, msg: "Post Created" });
};

// export const updatePost = async (req, res) => {
//   const postId = req.params.id;
//   const { image, title, description } = req.body;
//   await prisma.post.update({
//     where: {
//       id: Number(postId),
//     },
//     data: {
//       image: image,
//       title: title,
//       description: description,
//     },
//   });
//   const updatedPost = await prisma.post.findUnique({
//     where: {
//       id: Number(postId),
//     },
//   });
//   return res.json({ status: 200, message: "Post Updated Successfully" });
// };

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { image, title, description } = req.body;
  try {
    await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        image: image,
        title: title,
        description: description,
      },
    });
    
    // Fetch the updated post from the database
    const updatedPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    return res.json({ status: 200, message: "Post Updated Successfully", post: updatedPost });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};


export const showPost = async (req, res) => {
  const postId = req.params.id;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, data: post });
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, msg: "Post deleted successfully" });
};

export const searchPost = async (req, res) => {
  const query = req.query.q;
  const posts = await prisma.post.findMany({
    where: {
      description: {
        search: query,
        // contains:query //not sufficient for large data
      },
    },
  });
  return res.json({ status: 200, data: posts });
};
