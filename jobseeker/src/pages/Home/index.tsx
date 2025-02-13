import { Flex } from "@chakra-ui/react";
import Category from "./Category";
import Companies from "./Companies";
import Hero from "./Hero";
import Process from "./Process";
import Recommended from "./Recommended";
import SignUp from "./SignUp";
import Testimonials from "./Testimonials";
import Vacancies from "./Vacancies";

const Home = () => {
  return (
    <Flex flexDir={"column"}>
      <Hero />
      <Vacancies />
      <Process />
      <Recommended />
      <Category />
      <Companies />
      <Testimonials />
      <SignUp />
    </Flex>
  );
};

export default Home;
