import { Box, Text } from "@chakra-ui/react";

const SidebarItem = ({ type, label }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      p={3}
      bg="gray.100"
      borderRadius="6px"
      cursor="grab"
      onDragStart={onDragStart}
      draggable
    >
      <Text>{label}</Text>
    </Box>
  );
};

export default function Sidebar() {
  return (
    <Box width="200px" p={4} borderRight="1px solid #ddd">
      <SidebarItem type="paymentInit" label="Start Node" />
      <SidebarItem type="paymentCountry" label="Country Node" />
      <SidebarItem type="paymentProvider" label="Provider Node" />
    </Box>
  );
}