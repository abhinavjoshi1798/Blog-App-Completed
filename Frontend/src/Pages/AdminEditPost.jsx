// import React, { useContext, useEffect, useState } from 'react'
// import { AdminNavbar } from '../Components/AdminNavbar'
// import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Spinner, Stack } from '@chakra-ui/react';
// import { useParams } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';
// import { useToast } from "@chakra-ui/react";

// const AdminEditPost = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [postData,setPostData] = useState({})
//   const [image,setImage] = useState("")
//   const [title,setTitle] = useState("")
//   const [description,setDescription] = useState("")
//   const [editPostBtnClick,setEditPostBtnClick] = useState(false)

//   const toast = useToast();

//   const { isAuth, logout, user, token } = useContext(AuthContext);

//   const params = useParams();
//   console.log("params line 11",params)

//   const handleEditPost = () => {
//     const data = {

//       image,
//       title,
//       description
//     }
//   setLoading(true);
//   const id = params.postId;

//     fetch(`http://localhost:8080/admin/posts/${id}`,{
//       method:"put",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token
//       },
//       body:JSON.stringify(data)
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((res) => {

//         console.log(res);
//         if(res.status===200){
//           toast({
//             title: "Pos edited successfully.",
//             description: "Your post has been edited successfully.",
//             status: "success",
//             duration: 9000,
//             isClosable: true,
//           });
//  setImage(res.post.image)
//         setTitle(res.post.title)
//         setDescription(res.post.description)
//         }

//       })
//       .catch((err) => {
//         setError(true);
//         console.log(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });

// }

//   useEffect(() => {
//     const id = params.postId;
//     const fetchData = () => {
//       fetch(`http://localhost:8080/admin/singlepost/${id}`,{
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token
//         },
//       })
//         .then((res) => {
//           return res.json();
//         })
//         .then((res) => {
//           setPostData(res.data);
//           console.log(res);
//           setImage(res.data.image)
//           setTitle(res.data.title)
//           setDescription(res.data.description)
//         })
//         .catch((err) => {
//           setError(true);
//           console.log(err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     };

//     const delay = setTimeout(() => {
//       fetchData();
//     }, 1500);

//     return () => clearTimeout(delay);
//   }, []);

//   return (
//     <div>
//      <AdminNavbar />
//      {loading ? (
//         <Box
//           width={"100%"}
//           height={"100vh"}
//           display={"flex"}
//           justifyContent={"center"}
//           alignItems={"center"}
//         >
//           <Spinner
//             thickness="4px"
//             speed="0.65s"
//             emptyColor="gray.200"
//             color="blue.500"
//             size="xl"
//             margin={"auto"}
//           />
//         </Box>
//       ) : error ? (
//         <Box
//           width={"100%"}
//           height={"100vh"}
//           display={"flex"}
//           justifyContent={"center"}
//           alignContent={"center"}
//         >
//           <Heading margin={"auto"}>Error... Something went wrong</Heading>
//         </Box>
//       ) : (
//         <Box
//           width={"100%"}
//           height={"100vh"}
//           display={"flex"}
//           justifyContent={"center"}
//           alignContent={"center"}
//         >
//           <Flex
//           marginTop={"35px"}
//           minH={"100vh"}
//           align={"center"}
//           justify={"center"}
//           bg={"gray.50"}
//         >
//           <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//             <Stack align={"center"}>
//               <Heading fontSize={"2xl"}>
//                 Fill details and click Edit Post
//               </Heading>
//             </Stack>
//             <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
//               <Stack spacing={4}>
//                 <FormControl>
//                   <FormLabel>Image</FormLabel>
//                   <Input
//                     type="text"
//                     value={image}
//                     onChange={(e) => setImage(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel>Title</FormLabel>
//                   <Input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel>Description</FormLabel>
//                   <Input
//                     type="text"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                   />
//                 </FormControl>
//                 <Stack spacing={10}>
//                   <Button
//                     bg={"blue.400"}
//                     color={"white"}
//                     _hover={{
//                       bg: "blue.500",
//                     }}
//                     onClick={handleEditPost}
//                   >
//                     Edit Post
//                   </Button>
//                 </Stack>
//               </Stack>
//             </Box>
//           </Stack>
//         </Flex>
//         </Box>

//       )}
//     </div>
//   )
// }

// export default AdminEditPost

import React, { useContext, useEffect, useState } from "react";
import { AdminNavbar } from "../Components/AdminNavbar";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useToast } from "@chakra-ui/react";

const AdminEditPost = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState({});
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editPostBtnClick, setEditPostBtnClick] = useState(false);
  const toast = useToast();

  const { isAuth, logout, user, token } = useContext(AuthContext);
  const params = useParams();

  const handleEditPost = () => {
    setLoading(true); 
    const id = params.postId;
    const data = { image, title, description };

    fetch(`http://localhost:8080/admin/posts/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          toast({
            title: "Post edited successfully.",
            description: "Your post has been edited successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setImage(res.post.image);
          setTitle(res.post.title);
          setDescription(res.post.description);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        // Set loading to false after 1.5 seconds
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };

  useEffect(() => {
    const id = params.postId;
    const fetchData = () => {
      fetch(`http://localhost:8080/admin/singlepost/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setPostData(res.data);
          console.log(res);
          setImage(res.data.image);
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      <AdminNavbar />
      {loading ? (
        <Box
          width={"100%"}
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            margin={"auto"}
          />
        </Box>
      ) : error ? (
        <Box
          width={"100%"}
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Heading margin={"auto"}>Error... Something went wrong</Heading>
        </Box>
      ) : (
        <Flex
          marginTop={"35px"}
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={"gray.50"}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"2xl"}>
                Fill details and click Edit Post
              </Heading>
            </Stack>
            <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleEditPost}
                  >
                    Edit Post
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
    </div>
  );
};

export default AdminEditPost;
