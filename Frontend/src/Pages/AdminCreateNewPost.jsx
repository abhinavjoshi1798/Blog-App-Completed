// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Stack,
//   Button,
//   Heading,
//   useColorModeValue,
//   Spinner,
// } from "@chakra-ui/react";
// import { AdminNavbar } from "../Components/AdminNavbar";
// import { useContext, useState } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import { useToast } from "@chakra-ui/react"; // Import useToast

// export const AdminCreateNewPost = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const { isAuth, logout, user, token } = useContext(AuthContext);
//   const toast = useToast(); // Initialize useToast hook

//   const handelCreatePost = () => {
//     const data = {
//       image,
//       title,
//       description,
//       user_id: user.id,
//     };
//     setLoading(true);
//     fetch("http://localhost:8080/admin/create/", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//         if (res.status === 200) {
//           toast({
//             title: "Post created successfully.",
//             description: "Your post has been created successfully.",
//             status: "success",
//             duration: 9000,
//             isClosable: true,
//           });
//           setDescription("");
//           setTitle("");
//           setImage("");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       }).finally(()=>{
//         setLoading(false)
//       })
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       {loading ? (
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
//         <Flex
//           marginTop={"35px"}
//           minH={"100vh"}
//           align={"center"}
//           justify={"center"}
//           bg={"gray.50"}
//         >
//           <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//             <Stack align={"center"}>
//               <Heading fontSize={"2xl"}>
//                 Fill details and click Create Post
//               </Heading>
//             </Stack>
//             <Box
//               rounded={"lg"}
//               bg={"white"}
//               boxShadow={"lg"}
//               p={8}
//             >
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
//                     onClick={handelCreatePost}
//                   >
//                     Create Post
//                   </Button>
//                 </Stack>
//               </Stack>
//             </Box>
//           </Stack>
//         </Flex>
//       )}
//     </div>
//   );
// };


import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { AdminNavbar } from "../Components/AdminNavbar";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useToast } from "@chakra-ui/react"; // Import useToast

export const AdminCreateNewPost = () => {
  const [loading, setLoading] = useState(false); // Set loading to true initially
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { isAuth, logout, user, token } = useContext(AuthContext);
  const toast = useToast(); // Initialize useToast hook

  // Function to handle post creation
  const handleCreatePost = () => {
    const data = {
      image,
      title,
      description,
      user_id:user.id
    };

    setLoading(true); 

    setTimeout(() => {
      fetch("http://localhost:8080/admin/create/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast({
              title: "Post created successfully.",
              description: "Your post has been created successfully.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            setDescription("");
            setTitle("");
            setImage("");
          }
        })
        .catch((err) => {
          console.log(err);
          setError(true); 
        })
        .finally(() => {
          setLoading(false); 
        });
    }, 1500);
  };

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
                Fill details and click Create Post
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
                    onClick={handleCreatePost} 
                  >
                    Create Post
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
