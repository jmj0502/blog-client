import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { 
  Heading, 
  Flex, 
  Link, 
  Spacer, 
  Box 
} from "@chakra-ui/react";

export type HeaderProps = {
  title: string;
}

export const Header = ({title}: HeaderProps) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      color="white"
      background="brand.500"
    >
      <Box>
        <Link as={ReactLink} to="/" style={{textDecoration: 'none', paddingTop: '1px'}} >
          <Heading
            as="h1"
            size="lg"
            border="2px"
            borderRadius="md"
            padding="2"
          >
          {title}
          </Heading>
        </Link> 
      </Box>
      <Spacer />
      <Box>
        <Link 
          as={ReactLink} 
          to="/blog" 
          style={{textDecoration: 'none'}}
          fontWeight="bold"
          fontSize="2xl"
        >
          +
        </Link>
      </Box>
    </Flex>
  )
}