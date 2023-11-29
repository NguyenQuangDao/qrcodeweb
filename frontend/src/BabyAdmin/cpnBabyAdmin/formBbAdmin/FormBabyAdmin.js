import "./FormBabyAdmin.scss";
import axios from "axios";
import React, { useState, memo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {useUserContext} from '../../../Context/userContext'
import { Button, Form, Input, Select, InputNumber, message } from "antd";
const { Option } = Select;  
function FormBabyAdmin() {
  const { user } = useUserContext();
  const [form] = Form.useForm();
  const [successMess, setSuccessMess] = message.useMessage();
  // Handler khi submit form
  const handleSubmit = async (values) => {
    const id = uuidv4(); // Tạo ID tự động
    // Định dạng ID thành chuỗi kết hợp giữa kí tự và số
    const formattedID = "TXT" + id.substring(0, 6).toUpperCase(); // Lấy 8 kí tự đầu và chuyển thành chữ hoa
    const commonDrink = drinks.filter( (nameDrink) => selectedDrinks.includes(nameDrink.name));
    console.log(commonDrink);
    // console.log(selectedDrinks);
    // console.log(drinks);
    const billID = formattedID;
    const numCustomer = valueQuantityUser;
    const customerName = values.customerName;
    const storeName = values.storeName;
 
    const drinkData = commonDrink.map((drink) => ({
      drink: drink.name,
      quantity: values[`quantity_${drink.name}`],
      price:drink.price,
    }));
    const formData = {
      billID,
      numCustomer,
      customerName,
      storeName,
      drinks: drinkData,
    };

    // console.log("Form Data:", formData);

    // Gửi dữ liệu formData lên server
    await fetch("http://localhost:5555/api/bills/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data submitted successfully:", data);
        successMess.open({
          type: "success",
          content: "Thêm hóa đơn thành công",
        });
        // Thực hiện các xử lý sau khi gửi dữ liệu thành công
      })
      .catch((error) => {
        console.log("Error submitting data:", error);
        successMess.open({
          type: "success",
          content: "Thêm hóa đơn thất bại",
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // valueQuantityUser
  const [valueQuantityUser, setValueQuantityUser] = useState(1);

  const quantityUser = (value) => {
    setValueQuantityUser(value);
  };
  //   SelectStore
  const onChangeSelectStore = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearchStore = (value) => {
    console.log("search:", value);
  };
  // chọn đồ uống

  const [selectedDrinks, setSelectedDrinks] = useState([]);

  // Handler khi thay đổi lựa chọn đồ uống
  const handleDrinkChange = (value) => {
    setSelectedDrinks(value);
  };

  // Render các option cho Select
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/drinks");
        setDrinks(response.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchData();
  }, [user]);
  const renderDrinkOptions = () => {
    return drinks.map((drink) => (
      <Option key={drink._id} value={drink.name}>
        {drink.name}
      </Option>
    ));
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div id="FormBabyAdmin">
      {/* success */}
      {setSuccessMess}
      {/* success */}
      <Form
        name="basic"
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 750,
          margin: 10,
        }}
        initialValues={{
          remember: true,
        }}
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* số lượng khách */}
        <Form.Item
          label="Số lượng khách hàng"
          name="quantityuser"
          rules={[
            {
              required: false,
              message: "Vui lòng nhập thông tin",
            },
          ]}
        >
          <InputNumber
            name="numCustomer"
            type="number"
            size="large"
            min={1}
            max={100000}
            defaultValue={1}
            value={valueQuantityUser}
            onChange={quantityUser}
          />
        </Form.Item>
        {/* họ tên */}
        <Form.Item
          label="Họ tên khách hàng"
          name="customerName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* tên của hàng  */}
        <Form.Item
          label="Tên cửa hàng"
          name="storeName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn cửa hàng"
            optionFilterProp="store"
            onChange={onChangeSelectStore}
            onSearch={onSearchStore}
            filterOption={filterOption}
            options={[
              {
                value: "1000",
                label: "Hanoi",
              },
              {
                value: "1000",
                label: "Hanoi",
              },
              {
                value: "1000",
                label: "Hanoi",
              },
            ]}
          />
        </Form.Item>
        {/* đồ uống */}
        <Form.Item
          label="Select Drinks"
          name="drinks"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select drinks"
            onChange={handleDrinkChange}
            value={selectedDrinks}
          >
            {renderDrinkOptions()}
          </Select>
        </Form.Item>

        {selectedDrinks.map((drink) => (
          <Form.Item
            key={drink}
            label={`Số lượng ${drink}: `}
            name={`quantity_${drink}`}
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        ))}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(FormBabyAdmin);
