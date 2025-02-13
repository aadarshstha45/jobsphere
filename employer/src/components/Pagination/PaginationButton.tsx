/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonGroup, HStack, Icon } from "@chakra-ui/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PaginationButtonsProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  size?: string;
  renderButtons?: boolean;
  status?: string;
}

const PaginationButton = ({
  currentPage,
  setCurrentPage,
  totalPages,
  renderButtons,
  size,
  status,
}: PaginationButtonsProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    // navigate(`?${queryParams(prevPage)}`);
    navigate(
      status ? `?page=${prevPage}&status=${status}` : `?page=${prevPage}`
    );
  };

  // Function to handle next page
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    // navigate(`?${queryParams(nextPage)}`);
    navigate(
      status ? `?page=${nextPage}&status=${status}` : `?page=${nextPage}`
    );
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    // navigate(`?${queryParams(page)}`);
    navigate(status ? `?page=${page}&status=${status}` : `?page=${page}`);
  };

  const renderPageButtons = () => {
    const buttons = [];
    let startPage = Math.max(1, currentPage - 4);
    let endPage = Math.min(totalPages, currentPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          gap={0}
          key={i}
          onClick={() => handlePageClick(i)}
          variant={currentPage === i ? "solid" : "outline"}
          aria-label={`Page ${i}`}
          colorScheme="primary"
          size={size ?? "md"}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <HStack align={"center"} justify={"center"}>
      <ButtonGroup size={size ?? "md"}>
        <Button
          onClick={handlePrevPage}
          isDisabled={currentPage === 1}
          variant={"outline"}
          colorScheme="primary"
          size={size ?? "md"}
          px={0}
        >
          <Icon as={CaretLeft} boxSize={4} weight="bold" />
        </Button>
        {renderButtons ? (
          renderPageButtons()
        ) : (
          <Button
            variant={"outline"}
            colorScheme="primary"
            aria-label={`Page ${currentPage}`}
            onClick={() => handlePageClick(currentPage)}
            size={size ?? "md"}
            px={0}
          >
            {currentPage}
          </Button>
        )}
        <Button
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
          variant={"outline"}
          colorScheme="primary"
          size={size ?? "md"}
          px={0}
          shadow={"sm"}
        >
          <Icon as={CaretRight} boxSize={4} weight="bold" />
        </Button>
      </ButtonGroup>
    </HStack>
  );
};

export default PaginationButton;
