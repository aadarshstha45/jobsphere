import {
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { At, GlobeSimple, User } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Account from "./panels/Account";
import Personal from "./panels/Personal";
import Social from "./panels/Social";

const TabHeaders = [
  {
    id: 1,
    title: "Personal",
    icon: User,
    tab: "personal",
  },
  {
    id: 2,
    title: "Social Links",
    icon: GlobeSimple,
    tab: "social",
  },
  {
    id: 3,
    title: "Account Info",
    icon: At,
    tab: "account",
  },
];

const Profile = () => {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tabIndex]);

  return (
    <Flex
      maxW={{ base: "100vw", sm: "80vw", lg: "70vw" }}
      flexDir={"column"}
      gap={4}
    >
      <Text
        fontWeight={500}
        fontSize={{ base: "18px", md: "20px", xl: "22px" }}
      >
        Settings
      </Text>
      <Tabs index={tabIndex} variant={"unstyled"} isLazy>
        <TabList
          whiteSpace={"nowrap"}
          overflowX={"auto"}
          overflowY={"hidden"}
          scrollBehavior={"smooth"}
          sx={{
            scrollbarGutter: "none",
            scrollbarWidth: "thin",

            "&::-webkit-scrollbar": {
              color: "transparent",
            },
          }}
          px={0}
        >
          {TabHeaders.map((tab) => (
            <Tab
              fontWeight={500}
              _selected={{ borderColor: "primary.500" }}
              borderBottom={"6px solid"}
              borderColor={"primary.100"}
              transition={"all 0.3s"}
              key={tab.id}
              _hover={{
                boxShadow: "10px",
                borderRadius: "5px",
                borderBottomRadius: 0,
              }}
              whiteSpace={"nowrap"}
              onClick={() => setTabIndex(tab.id - 1)}
            >
              <Icon as={tab.icon} mr={2} boxSize={5} />
              {tab.title}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel px={2}>
            <Personal tab="personal" />
          </TabPanel>
          <TabPanel px={2}>
            <Social tab="social" />
          </TabPanel>
          <TabPanel px={2}>
            <Account
              tab="account"
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Profile;
