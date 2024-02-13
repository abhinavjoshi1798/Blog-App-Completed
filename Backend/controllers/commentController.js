import prisma from "../Db/db.config.js";

export const fetchComments = async (req, res) => {
    const comments = await prisma.comment.findMany({
      include:{
        user:true,
        post:{
          include:{
            user:true
          }
        }
      }
    });
    return res.json({ status: 200, data: comments });
};

export const createComment = async (req, res) => {
    const { user_id, post_id, comment } = req.body;

    await prisma.post.update({
        where:{
            id:Number(post_id)
        },
        data:{
            comment_count:{
                increment:1
            }
        }
    })

    const newComment = await prisma.comment.create({
        data: {
            user_id: Number(user_id),
            post_id: Number(post_id),
            comment: comment
        },
    });
    return res.json({ status: 200, data: newComment, msg: "Comment Created Successfully" });
};

export const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const { comment } = req.body;
    await prisma.comment.update({
        where: {
            id: commentId,
        },
        data: {
            comment: comment
        },
    });
    return res.json({ status: 200, message: "Comment Updated Successfully" });
};

export const showComments = async (req, res) => {
    const postId = req.params.id;
    const comment = await prisma.comment.findFirst({
        where: {
            post_id: Number(postId),
        },
    });
    return res.json({ status: 200, data: comment });
};

// export const deleteComment = async (req, res) => {
//   const commentId = req.params.id;
  
//   await prisma.comment.delete({
//     where: {
//       id: commentId,
//     },
//   });

//   const comment = await prisma.comment.find({
//     id:commentId
//   })
   
//   await prisma.post.update({
//     where:{
//         id:Number(comment.post_id)
//     },
//     data:{
//         comment_count:{
//             decrement:1
//         }
//     }
// })

//   return res.json({ status: 200, msg: "Comment deleted successfully" });
// };


export const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    
    // Find the comment to get its post_id
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
  
    if (!comment) {
      return res.status(404).json({ status: 404, msg: "Comment not found" });
    }
  
    const postId = comment.post_id;
  
    // Delete the comment
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  
    // Update the corresponding post's comment_count
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        comment_count: {
          decrement: 1,
        },
      },
    });
  
    return res.json({ status: 200, msg: "Comment deleted successfully" });
  };
  