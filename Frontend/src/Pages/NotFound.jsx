import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const NotFound = () => {
  return (
    <div>
      <Box width={"100%"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}>
        <Heading>Not Found ! 404...</Heading>
      </Box>
    </div>
  )
}

export default NotFound
