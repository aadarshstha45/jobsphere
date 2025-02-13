import {
  Container,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { At, GlobeSimple, User, UserCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Account from "./panels/Account";
import Company from "./panels/Company";
import Founding from "./panels/Founding";
import Social from "./panels/Social";

const TabHeaders = [
  {
    id: 1,
    title: "Company Info",
    icon: User,
    tab: "company",
  },
  {
    id: 2,
    title: "Founding Info",
    icon: UserCircle,
    tab: "founding",
  },
  {
    id: 3,

    title: "Social Info",
    icon: GlobeSimple,
    tab: "social",
  },
  {
    id: 4,
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
    <Container
      maxW={{ base: "100vw", sm: "90vw", md: "70vw", xl: "60vw" }}
      mx={0}
      px={0}
    >
      <Flex flexDir={"column"} gap={4}>
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
                borderBottom={"4px solid"}
                borderColor={"gray.200"}
                key={tab.id}
                onClick={() => setTabIndex(tab.id - 1)}
              >
                <Icon as={tab.icon} mr={2} boxSize={5} />
                {tab.title}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Company
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                tab="company"
              />
            </TabPanel>
            <TabPanel px={0}>
              <Founding
                tab="founding"
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
              />
            </TabPanel>
            <TabPanel px={0}>
              <Social
                tab="social"
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
              />
            </TabPanel>
            <TabPanel px={0}>
              <Account
                tab="account"
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
};

export default Profile;
