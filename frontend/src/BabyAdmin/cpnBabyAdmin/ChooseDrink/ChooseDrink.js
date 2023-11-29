// import React, { useState } from "react";
// import { Form, Select, InputNumber, Button } from "antd";

// const { Option } = Select;

// function FormBabyAdmin() {
//   const [selectedDrinks, setSelectedDrinks] = useState([]);
//   const [form] = Form.useForm();

//   // Handler khi submit form
//   const handleSubmit = (values) => {
//     const drinkData = selectedDrinks.map((drink) => ({
//       [drink]: values[`quantity_${drink}`]
//     }));
//     console.log("Selected Drinks Data:", drinkData);
//   };

//   // Handler khi thay đổi lựa chọn đồ uống
//   const handleDrinkChange = (value) => {
//     setSelectedDrinks(value);
//   };

//   // Render các option cho Select
//   const renderDrinkOptions = () => {
//     const drinks = ["Coffee", "Tea", "Juice", "Soda"];

//     return drinks.map((drink) => (
//       <Option key={drink} value={drink}>
//         {drink}
//       </Option>
//     ));
//   };

//   return (
//     <Form form={form} onFinish={handleSubmit}>
//       <Form.Item label="Select Drinks" name="drinks">
//         <Select
//           mode="multiple"
//           placeholder="Select drinks"
//           onChange={handleDrinkChange}
//           value={selectedDrinks}
//         >
//           {renderDrinkOptions()}
//         </Select>
//       </Form.Item>

//       {selectedDrinks.map((drink) => (
//         <Form.Item
//           key={drink}
//           label={`Quantity for ${drink}`}
//           name={`quantity_${drink}`}
//           rules={[{ required: true, message: "Please enter quantity" }]}
//         >
//           <InputNumber min={1} />
//         </Form.Item>
//       ))}

//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }

// export default FormBabyAdmin;