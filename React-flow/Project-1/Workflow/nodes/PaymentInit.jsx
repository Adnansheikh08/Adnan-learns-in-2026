import { Box, Text } from "@chakra-ui/react";
import { Handle, Position } from "reactflow";

export default function PaymentInit() {
  return (
    <Box
      bg="#dbeafe"
      p={3}
      borderRadius="8px"
      border="2px solid #3b82f6"
      fontWeight="bold"
    >
      🚀 Start Payment

      <Handle type="source" position={Position.Right} />
    </Box>
  );
}