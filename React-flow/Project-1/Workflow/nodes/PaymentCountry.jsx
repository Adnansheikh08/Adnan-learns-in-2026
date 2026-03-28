import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ReactCountryFlag from "react-country-flag";
import { Handle, Position } from "reactflow";

export default function PaymentCountry({ data , id }) {
  return (
    <Flex
      alignItems="center"
      borderRadius="8px"
      bg="#e2e8f0"
      border="2px solid #bbbdbf"
      p={2}
      gap={2}
      width="180px"
    >
      {/* Flag */}
      <Box>
        <ReactCountryFlag
          countryCode={data.countryCode}
          svg
          style={{ fontSize: "1.5em" }}
        />
      </Box>

      {/* ✅ DELETE BUTTON */}
            <Button
              size="sm"
              colorScheme="red"
              mt={2}
              ml={2}
              onClick={() => data.onDelete(id)}
            >
              Delete
            </Button>

      {/* Text */}
      <Box>
        <Text fontSize="sm">{data.country}</Text>
        <Text fontSize="xs">{data.currency}</Text>
      </Box>

      {/* Handles */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Flex>
  );
}