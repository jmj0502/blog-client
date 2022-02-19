import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { Heading, Flex, Button, Link } from "@chakra-ui/react";

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
      background="green"
    >
      <Flex
        align="center"
        mr={5}
      >
		<Link as={ReactLink} to="/" >
			<Heading
			as="h1"
			size="lg"
			>
			{title}
			</Heading>
		</Link> 
      </Flex>
      <Button
        bg="transparent"
        border="1px"
      >
        Add Feature
      </Button>
	  <Link as={ReactLink} to="/blog" >
		  +
	  </Link>
    </Flex>
  )
}