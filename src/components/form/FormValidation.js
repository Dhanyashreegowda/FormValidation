import React, { useState }  from 'react'
import './FormValidation.css'
import { Form, Input , Select ,Button, Row,Col} from 'antd';
import { Card } from 'antd';
import { Steps } from 'antd';
import { Country, State, City } from 'country-state-city';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch } from "react-redux";
import { setVendorDetails } from "../../redux/formSlice";


const { Option } = Select;

const FormValidation = () => {

    const navigate = useNavigate(); // Initialize useNavigate
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log('Success:', values);
        // if(values){
        // localStorage.setItem("formData", JSON.stringify(values));
        // }
        // Handle form submission logic here
        dispatch(setVendorDetails(values));

        // Navigate to the BankDetails page after successful submission
    navigate('/bank-details');
    };


    // const  storegeData= localStorage.getItem("formData")
    //  const parseData=JSON.parse(storegeData)

    // console.log("AccountNumber", parseData.accountNumber)


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        // Handle form validation errors here
    };


    const [countries, setCountries] = useState(Country.getAllCountries());
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const [selectedCountry, setSelectedCountry] = useState(null);
	const [selectedState, setSelectedState] = useState(null);

	const handleCountryChange = (country) => {
		setSelectedCountry(country);
		setStates(State.getStatesOfCountry(country.isoCode));
		setCities([]);
	};

	const handleStateChange = (state) => {
		setSelectedState(state);
		setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
	};

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <Option value="87">+91</Option>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
            
          </Select>
        </Form.Item>
      );
  return (
    <div>
        
    <Card className='card_container'>

        <div className='top_part'>
            <h2 className='main_head'>Vender Registration</h2>
            <Steps className='step_size' progressDot current={0} items={[
                { title: 'Vender Details' },
                { title: 'Bank Details' },
                { title: 'Vender Services' },
            ]} />
        </div>    
            <Form
                name="layout-multiple-horizontal"
                layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >

                    <Card className='forBorder'>


                    {/* Company Details Section */}
                    <div>
                            <div className='heading'>
                                <h4>Company Details</h4>
                            </div>
                            <Row gutter={[24,24]}>
                                <Col lg={8} md={8} sm={24} xs={24} xl={8}>
                                <Form.Item 
                                        layout="vertical"
                                        label="CompanyName"
                                        name="CompanyName"
                                        rules={[
                                            {
                                                required: true,
                                                validator: (_, value) => {
                                                    if (!value) {
                                                        return Promise.reject("Company Name is required");
                                                    }
                                                    if (value.length < 3 || value.length > 50) {
                                                        return Promise.reject("Company Name must be between 3 and 50 characters");
                                                    }
                                                    if (/ {2,}/.test(value)) {
                                                        return Promise.reject("Company Name should not contain consecutive spaces");
                                                    }
                                                    if (!/^[a-zA-Z0-9&' -]+$/.test(value)) {
                                                        return Promise.reject("Only letters, numbers, &, ', -, and single spaces are allowed");
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input placeholder="Enter company name" />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} md={8} sm={24} xs={24} xl={8}>
                                <Form.Item
                                        layout="vertical"
                                        label="Companytype"
                                        name="companyType"
                                        rules={[{ required: true }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    
                                    >
                                        <Select placeholder="Select company type">
                                            <Option value="startup">Startup</Option>
                                            <Option value="corporate">Corporate</Option>
                                            <Option value="non_profit">Non-Profit</Option>
                                            <Option value="government">Government</Option>
                                        </Select>
                                    </Form.Item>

                                </Col>
                                <Col lg={8} md={8} sm={24} xs={24} xl={8}>
                                <Form.Item
                                        layout="vertical"
                                        label="Industry"
                                        name="Industry"
                                        rules={[{ required: true }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Select placeholder="Select Industry">
                                            <Option value="startup">Startup</Option>
                                            <Option value="corporate">Corporate</Option>
                                            <Option value="government">Government</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                    </div>
                    <br/>
                            
                    {/* Contact Information Section */}
                    <div>
                        <div className='heading'>
                            <h4>Contact Information</h4>
                        </div>
                        <Row gutter={[24,24]} className='last_row_space' >

                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                                layout="vertical"
                                label="FirstName"
                                name="FirstName"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("First Name is required");
                                            }
                                            if (value.length < 3 || value.length > 50) {
                                                return Promise.reject("First Name must be between 3 and 50 characters");
                                            }
                                            if (/ {2,}/.test(value)) {
                                                return Promise.reject("First Name should not contain consecutive spaces");
                                            }
                                            if (!/^[a-zA-Z ]+$/.test(value)) {
                                                return Promise.reject("Only letters and single spaces are allowed");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter first name" />
                            </Form.Item>


                        </Col>

                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                                layout="vertical"
                                label="MiddleName"
                                name="MiddleName"
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.resolve(); // Optional field
                                            }
                                            if (value.length < 3 || value.length > 50) {
                                                return Promise.reject("Middle Name must be between 3 and 50 characters");
                                            }
                                            if (/ {2,}/.test(value)) {
                                                return Promise.reject("Middle Name should not contain consecutive spaces");
                                            }
                                            if (!/^[a-zA-Z ]+$/.test(value)) {
                                                return Promise.reject("Only letters and single spaces are allowed");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter middle name" />
                            </Form.Item>

                        </Col>

                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                                layout="vertical"
                                label="LastName"
                                name="LastName"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("Last Name is required");
                                            }
                                            if (value.length < 3 || value.length > 50) {
                                                return Promise.reject("Last Name must be between 3 and 50 characters");
                                            }
                                            if (/ {2,}/.test(value)) {
                                                return Promise.reject("Last Name should not contain consecutive spaces");
                                            }
                                            if (!/^[a-zA-Z ]+$/.test(value)) {
                                                return Promise.reject("Only letters and single spaces are allowed");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter last name" />
                            </Form.Item>
                        </Col>

                        </Row>



                        <Row gutter={[24,24]} className='last_row_space' >

                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                                layout="vertical"
                                label="Email Id"
                                name="EmailId"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("Email is required");
                                            }
                                            if (value.length < 8 || value.length > 50) {
                                                return Promise.reject("Email must be between 8 and 50 characters");
                                            }
                                            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                            if (!emailPattern.test(value)) {
                                                return Promise.reject("Enter a valid email address");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter email" />
                            </Form.Item>


                        </Col>

                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                                layout="vertical"
                                label="AlternateEmailId"
                                name="AlternateEmailId"
                                rules={[
                                    {
                                        validator: (_, value, { getFieldValue }) => {
                                            if (!value) {
                                                return Promise.resolve(); // Optional field
                                            }
                                            if (value.length < 8 || value.length > 50) {
                                                return Promise.reject("Alternate Email must be between 8 and 50 characters");
                                            }
                                            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                            if (!emailPattern.test(value)) {
                                                return Promise.reject("Enter a valid email address");
                                            }
                                            if (value === getFieldValue("Email Id")) {
                                                return Promise.reject("Alternate Email must be different from the primary email");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter alternate email" />
                            </Form.Item>

                        
                        </Col>

                        <Col className='spacing'lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                                layout="vertical"
                                label="Mobile Number"
                                name="MobileNumber"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("Mobile Number is required");
                                            }
                                            if (!/^\d{10}$/.test(value)) {
                                                return Promise.reject("Mobile Number must be exactly 10 digits");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter mobile number" addonBefore={prefixSelector} />
                            </Form.Item>
                        
                        </Col>


                        </Row>

                        <Row gutter={[24,24]} className='last_row_space' >

                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                                layout="vertical"
                                label="AlternateNumber"
                                name="AlternateNumber"
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.resolve(); // Optional field
                                            }
                                            if (!/^\d{10}$/.test(value)) {
                                                return Promise.reject("Alternate Number must be exactly 10 digits");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter alternate number" addonBefore={prefixSelector} />
                            </Form.Item>


                        </Col>

                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                                layout="vertical"
                                label="Country"
                                name="Country"
                                rules={[{ required: true }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <select
                                    className='form-select'
                                    onChange={(e) => handleCountryChange(countries.find((c) => c.isoCode === e.target.value))}
                                    style={{ width: '100%', height: '32px' }} 
                                >
                                    <option value=''>Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.isoCode} value={country.isoCode}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </Form.Item>


                        </Col>
                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>

                        <Form.Item
                                layout="vertical"
                                label="State"
                                name="State"
                                rules={[{ required: true }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <select
                                    disabled={!selectedCountry}
                                    className='form-select'
                                    onChange={(e) => handleStateChange(states.find((s) => s.isoCode === e.target.value))}
                                    style={{ width: '100%', height: '32px' }} 
                                >
                                    <option value=''>Select State</option>
                                    {states.map((state) => (
                                        <option key={state.isoCode} value={state.isoCode}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </Form.Item>
                        

                        </Col>
                        </Row>

                        <Row gutter={[24,24]} className='last_row_space' >
                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={12}>

                        <Form.Item
                                layout="vertical"
                                label="AddressLine1"
                                name="AddressLine1"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("Address Line 1 is required");
                                            }
                                            if (value.length < 3 || value.length > 500) {
                                                return Promise.reject("Address Line 1 must be between 3 and 500 characters");
                                            }
                                            if (!/^[a-zA-Z0-9 ,.\-]+$/.test(value)) {
                                                return Promise.reject("Only letters, numbers, spaces, commas, periods, and hyphens are allowed");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter address line 1" />
                            </Form.Item>


                        </Col>

                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={12}>
                        <Form.Item
                                layout="vertical"
                                label="AddressLine2"
                                name="AddressLine2"
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.resolve(); // Optional field
                                            }
                                            if (value.length < 3 || value.length > 500) {
                                                return Promise.reject("Address Line 2 must be between 3 and 500 characters");
                                            }
                                            if (!/^[a-zA-Z0-9 ,.\-]+$/.test(value)) {
                                                return Promise.reject("Only letters, numbers, spaces, commas, periods, and hyphens are allowed");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter address line 2" />
                            </Form.Item>
                        
                        
                        </Col>

                        </Row>
                        
                        
                        <Row gutter={[24,24]} className='last_row_space'>
                        <Col className='spacing' lg={7} md={7} sm={16} xs={16} xl={6}>
                        <Form.Item
                                layout="vertical"
                                label="City"
                                name="City"
                                rules={[{ required: true }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <select
                                    disabled={!selectedState || !selectedCountry}
                                    className='form-select'
                                    style={{ width: '100%', height: '32px' }} 
                                >
                                    <option value=''>Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.name} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </Form.Item>


                        </Col>
                        <Col className='spacing' lg={7} md={7} sm={16} xs={16} xl={6}>
                        <Form.Item
                                layout="vertical"
                                label="Division/Taluk"
                                name="DivisionTaluk"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("Division/Taluk is required");
                                            }
                                            if (value.length < 3 || value.length > 20) {
                                                return Promise.reject("Division/Taluk must be between 3 and 20 characters");
                                            }
                                            if (/ {2,}/.test(value)) {
                                                return Promise.reject("Division/Taluk should not contain consecutive spaces");
                                            }
                                            if (!/^[a-zA-Z ]+$/.test(value)) {
                                                return Promise.reject("Only letters and single spaces are allowed");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter division/taluk" />
                            </Form.Item>

                        
                        </Col>
                        <Col className='spacing' lg={7} md={7} sm={16} xs={16} xl={6}>
                        <Form.Item
                                layout="vertical"
                                label="Village/Area/Ward/Block"
                                name="VillageAreaWardBlock"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("Village/Area/Ward/Block is required");
                                            }
                                            if (value.length < 3 || value.length > 20) {
                                                return Promise.reject("Village/Area/Ward/Block must be between 3 and 20 characters");
                                            }
                                            if (/ {2,}/.test(value)) {
                                                return Promise.reject("Village/Area/Ward/Block should not contain consecutive spaces");
                                            }
                                            if (!/^[a-zA-Z ]+$/.test(value)) {
                                                return Promise.reject("Only letters and single spaces are allowed");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter village/area/ward/block" />
                            </Form.Item>
                        
                        </Col>
                        <Col className='spacing' lg={7} md={7} sm={16} xs={16} xl={6}>
                        <Form.Item
                                layout="vertical"
                                label="Zip/PinCode"
                                name="ZipPinCode"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.reject("Zip/Pin Code is required");
                                            }
                                            if (!/^\d{6}$/.test(value)) {
                                                return Promise.reject("Zip/Pin Code must be exactly 6 digits");
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input placeholder="Enter zip/pin code" />
                            </Form.Item>
                        </Col>
                        </Row>

                    </div>

                    {/* Statutory Details Section */}
                    <div>
                        <div className='heading'>
                            <h4>Statutory </h4>
                        </div>

                        <Row gutter={[24,24]} className='last_row_space'>
                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                        layout="vertical"
                        label="CINNo."
                        name="CINNo"
                        rules={[
                            {
                                required: true,
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.reject("CIN No. is required");
                                    }
                                    if (value.length !== 21) {
                                        return Promise.reject("CIN No. must be exactly 21 characters long");
                                    }
                                    const cinPattern = /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
                                    if (!cinPattern.test(value)) {
                                        return Promise.reject("Enter a valid CIN No. format (e.g., L12345AB2000XYZ123456)");
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input placeholder="Enter CIN No." />
                    </Form.Item>


                        </Col>
                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                            layout="vertical"
                            label="GSTNo."
                            name="GSTNo"
                            rules={[
                                {
                                    required: true,
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("First Name is required");
                                        }
                                        if (value.length !== 15) {
                                            return Promise.reject("GST Number must be exactly 15 characters long");
                                        }
                                        const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
                                        if (!gstPattern.test(value)) {
                                            return Promise.reject("Enter a valid GST Number format 29PQRSX4321M3Z9");
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                            
                            labelCol={{span: 24,}}
                            wrapperCol={{span: 24,}}>
                            <Input placeholder="Enter GST No." />
                        </Form.Item>

                        
                        </Col>
                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                            layout="vertical"
                            label="PANNo."
                            name="PANNo"
                            rules={[
                                {
                                    required: true,
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("PAN is required");
                                        }
                                        if (value.length !== 10) {
                                            return Promise.reject("PAN must be exactly 10 characters long");
                                        }
                                        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                                        if (!panPattern.test(value)) {
                                            return Promise.reject("Enter a valid PAN format (ABCDE1234F)");
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                            
                            labelCol={{span: 24,}}
                            wrapperCol={{span: 24,}}>
                                <Input placeholder="Enter PAN No." />
                        </Form.Item>
                        
                        
                        </Col>
                        </Row>

                    <Row gutter={[24,24]}>
                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                    layout="vertical"
                    label="TANNo."
                    name="TANNo"
                    rules={[
                        {
                            required: true,
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.reject("TAN is required");
                                }
                                if (value.length !== 10) {
                                    return Promise.reject("TAN must be exactly 10 characters long");
                                }
                                const panPattern = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
                                if (!panPattern.test(value)) {
                                    return Promise.reject("Enter a valid PAN format (ABCD12345F)");
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                    
                    labelCol={{span: 24,}}
                    wrapperCol={{span: 24,}}>
                    <Input placeholder="Enter TAN No." />
                </Form.Item>


                        </Col>
                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                        layout="vertical"
                        label="TradeNameorTradeNo"
                        name="TradeNameorTradeNo"
                        rules={[ 
                            {
                                required: true,
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.reject("Trade Name or Trade No. is required");
                                    }
                                    if (value.length < 3 || value.length > 20) {
                                        return Promise.reject("Trade Name or Trade No. must be between 3 and 20 characters long");
                                    }
                                    const tradePattern = /^[A-Za-z0-9 ,.\-]+$/;
                                    if (!tradePattern.test(value)) {
                                        return Promise.reject("Only letters, numbers, spaces, commas, periods, and hyphens are allowed");
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input placeholder="Enter Trade Name or Trade No." />
                        </Form.Item>
                        
                        </Col>
                        <Col className='spacing' lg={8} md={8} sm={24} xs={24} xl={8}>
                        <Form.Item
                            layout="vertical"
                            label="Factory LicenseNo."
                            name="FactoryLicenseNo"
                            rules={[
                                {
                                    required: true,
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject("Factory License Number is required");
                                        }
                                        if (value.length !== 15) {
                                            return Promise.reject("Factory License Number must be exactly 15 characters long");
                                        }
                                        const licensePattern = /^[A-Z0-9]{15}$/;
                                        if (!licensePattern.test(value)) {
                                            return Promise.reject("Only uppercase letters and digits are allowed 27ABCDE1234F1Z5");
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                            
                            labelCol={{span: 24,}}
                            wrapperCol={{span: 24,}}>
                                <Input placeholder="Enter  Factory License." />
                        </Form.Item>
                        
                                
                        </Col>
                    </Row>

                    </div>
                
                    </Card>

                    <div className='saveButton'>
                        <Button type="primary" htmlType="submit">Save and Continue</Button>
                    </div>
            </Form>

        </Card>
     
    </div>     
    
  )
}

export default FormValidation;
