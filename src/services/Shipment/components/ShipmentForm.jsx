import { useEffect, useState } from "react";
import { useModal } from "../../../shared/components/ModalProvider";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useFormik } from "formik";
import { Button, Col, Divider, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import inputHelper from "../../../shared/utils/inputHelper";
import { SharedBtn, SharedForm, SharedInput } from "../../../shared/components/common";
import { useSelector } from "react-redux";
import vehicleApi from "../../Vehicle/api/vehicleApi";
import batchApi from "../../Batch/api/batchApi";
import partnerAddressApi from "../../Partner/api/partnerAddressApi";
import { shipmentValidationSchema } from "../utils/validation";
// import warehouseApi from "../../Warehouse/api/warehouseApi";

const initialShipmentBatchValues = {
    id: 0,
    key: 0,
	batchId: null,
    partnerName:"",
    partnerAddressId: null, 
    shipmentOrder: 0,
    addressOptions: []
}

function FormCreateShipment({setBeforeSave, ...props}) {
    const {setModalData} = useModal();
    const [vehicles, setVehicles] = useState([]);
    const [batches, setBatches] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const users = useSelector((state) => state.users.userList);
    const loadingUsers = useSelector((state) => state.users.status === 'loading');
    const [approversText, setApproversText] = useState("");
    const [participantsText, setParticipantsText] = useState("");

    // Get vehicles for options
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await vehicleApi.getAllVehicles();
                setVehicles(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchVehicles();
    }, []);

    // Get batches for options
    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await batchApi.getPackedBatch();
                setBatches(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchBatches();
    }, []);

    // Get address for options
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await partnerAddressApi.getAllAddresses();
                setAddresses(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchAddresses();
    }, []);

    const initialValues = {
		id: 0,
		name: "",
        vehicleId: null,
		date: null,
        shipmentBatches: [initialShipmentBatchValues],
        approverIds: [],
        participantIds: []
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: shipmentValidationSchema,
		onSubmit: (values) => {},
	});
    
    const [shipmentBatches, setShipmentBatches] = useState(formik.values.shipmentBatches);
    
    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

     // BeforSave: validate
     useEffect(() => {
        if (setBeforeSave) {
            setBeforeSave(() => formik.submitForm());
        }
    }, [setBeforeSave, formik]);

    const vehicleOptions = inputHelper.convertArrToSelectOption(vehicles);
    const batchOptions = inputHelper.convertArrToSelectOption(batches);

    // Handle select batch 
    const handleSelectBatch = (key, batchId) => {
        // Get selected item of shipmentBatches
        const itemSelect = shipmentBatches.find((item) => item.key === key);
        
        // Update item info by seletec batch
        const selectedBatch = batches.find(p => p.id === batchId);
        const partner = selectedBatch.partner;
        const partnerAddresses = addresses.filter((address) => address.partnerId === partner.id);

        if (selectedBatch) {
            itemSelect.batchId = batchId;
            itemSelect.partnerName = partner.name;
            itemSelect.addressOptions = inputHelper.convertArrToSelectOption(partnerAddresses);
        }

        // Update
        updateShipmentBatches(itemSelect);
    }

    // Handle select addresss 
    const handleSelectAddress = (key, addressId) => {
        // Get selected item of shipmentBatches
        const itemSelect = shipmentBatches.find((item) => item.key === key);
        
        // Update item info by seletec address
        const selectedAddress = addresses.find(p => p.id === addressId);

        if (selectedAddress) {
            itemSelect.partnerAddressId = selectedAddress.id;
        }

        // Update
        updateShipmentBatches(itemSelect);
    }

    // Handle change order of a shipmnet batch
    const handleChangeOrder = (key, order) => {
        const itemSelect = shipmentBatches.find((item) => item.key === key);

        // Update order
        itemSelect.shipmentOrder = order;

        // Update
        updateShipmentBatches(itemSelect);
    };

    // Handle add new shipment_batch
    const handeAddBatch = () => {
		const newItem = {
			...initialShipmentBatchValues,
			key: shipmentBatches.length,
		};
		setShipmentBatches([...shipmentBatches, newItem]);
		formik.setFieldValue("shipmentBatches", [...shipmentBatches, newItem]);
	};

      // Handle delete batch
	const handleDeleteBatch = (key) => {
		const newItems = shipmentBatches.filter((item) => item.key !== key);
		setShipmentBatches(newItems.length === 0 ? [initialShipmentBatchValues] : newItems);
		formik.setFieldValue("shipmentBatches", shipmentBatches);
	};

    // Handle update shipmentBatches when a batch change
    const updateShipmentBatches = (newItem) => {
        const newItems = shipmentBatches.map((item) => {
			if (item.key === newItem.key) {
				return { ...newItem };
			}
			return item;
		});
		setShipmentBatches(newItems);
		formik.setFieldValue("shipmentBatches", newItems);
    }

    return (
        <SharedForm.FormBody>
             <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Shipment name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Shipment name*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
            </SharedForm.FormBodyItem>

            {/* Vehicle and date */}
            <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="vehicleId">Shipment vehicle</SharedInput.Label>
                        <SharedInput.SelectInput
                            name="vehicleId"
                            showSearch
                            options={vehicleOptions}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please choose a vehicle"
                            onChange={(value) => formik.setFieldValue("vehicleId", value)}
                            onBlur={formik.handleBlur}
                            value={formik.values.vehicleId}
                            error={formik.touched.vehicleId && formik.errors.vehicleId}
                        />
                    </SharedForm.FormBodyItem>	
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="date">Shipment date</SharedInput.Label>
                        <SharedInput.DatePickerCustom 
                            format="DD/MM/YYYY"
                            value={formik.values.date}
                            onChange={(date) => formik.setFieldValue("date", date)}
                            style={{
                                width: '100%',
                            }}
                        />
                    </SharedForm.FormBodyItem>
                </Col>
            </Row>

             {/* Approvers and participants */}
             <Row gutter={24}>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="approverIds">Approvers</SharedInput.Label>
                        <SharedInput.UserMention
                            name="approverIds"
                            placeholder="Please choose approvers"
                            loading={loadingUsers}
                            value={approversText}
                            onChange={(value) => {
                                formik.setFieldValue("approverIds", inputHelper.convertUserMentionsToIds(value, users))
                                setApproversText(value);
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.touched.approverIds && formik.errors.approverIds}
                        />
                    </SharedForm.FormBodyItem>	
                </Col>
                <Col span={12}>
                    <SharedForm.FormBodyItem>
                        <SharedInput.Label forName="participantIds">Participants</SharedInput.Label>
                        <SharedInput.UserMention
                            name="participantIds"
                            placeholder="Please choose participants"
                            loading={loadingUsers}
                            value={participantsText}
                            onChange={(value) => {
                                formik.setFieldValue("participantIds", inputHelper.convertUserMentionsToIds(value, users))
                                setParticipantsText(value);
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.touched.participantIds && formik.errors.participantIds}
                        />
                    </SharedForm.FormBodyItem>			
                </Col>
            </Row>

            {/* Shipment Batches */}
            <Divider orientation="left" orientationMargin={0}>Shipment Batches</Divider>
            {/* Order Item */}
            <Row gutter={24}>
                <Col span={6}>
                    <SharedInput.Label>Batch</SharedInput.Label>
                </Col>
                {/* Category */}
                <Col span={6}>
                    <SharedInput.Label>Partner</SharedInput.Label>
                </Col>
                {/* Unit */}
                <Col span={6}>
                    <SharedInput.Label>Address</SharedInput.Label>
                </Col>
                {/* Quantity */}
                <Col span={3}>
                    <SharedInput.Label>Order</SharedInput.Label>
                </Col>
                {/* Delete button */}
                <Col span={3}>
                </Col>
            </Row>
            {
                shipmentBatches.map((item, index) => (
                    <Row gutter={24} key={item.key }>
                    {/* Batch */}
                    <Col span={6}>
                        <SharedInput.SelectInput
                            name="batchId"
                            showSearch
                            options={batchOptions}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please choose a batch"
                            onChange={(value) => handleSelectBatch(item.key, value)}
                            value={item.productId}
                        />
                    </Col>
                    {/* Partner name */}
                    <Col span={6}>
                        <SharedInput.Text 
                            value={item.partnerName}
                            disabled
                        />
                    </Col>
                    {/* Address */}
                    <Col span={6}>
                        <SharedInput.SelectInput 
                            name="partnerAddressId"
                            showSearch
                            options={item.addressOptions}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please choose a partner address"
                            onChange={(value) => handleSelectAddress(item.key, value)}
                            value={item.partnerAddressId}
                        />
                    </Col>
                    {/* Quantity */}
                    <Col span={3}>
                        <SharedInput.Text 
                            type="number"
                            name="shipmentOrder"
                            value={item.shipmentOrder}
                            onChange={(e) => handleChangeOrder(item.key, e.target.value)}
                        />
                    </Col>
                    {/* Delete button */}
                    <Col span={3}>
                        <Button danger onClick={() => handleDeleteBatch(item.key)}>
                            <DeleteOutlined />
                        </Button>
                    </Col>
                </Row>
                ))
            }
             <SharedBtn.BtnSave 
                type="link"
                label="Add more batch"
                onClick={handeAddBatch}
            />
        </SharedForm.FormBody>
    )
}

function FormCreateShipmentVrp({setBeforeSave, ...props}) {
    const {setModalData} = useModal();
    const [vehicles, setVehicles] = useState([]);
    const [batches, setBatches] = useState([]);
    const [addresses, setAddresses] = useState([]);
    // const [warehouses, setWarehouses] = useState([]);

    // // Get warehouses for options
    // useEffect(() => {
    //     const fetchWarehouses = async () => {
    //         try {
    //             const response = await warehouseApi.getAllWarehouses();
    //             setWarehouses(response.data.data); 
    //         } catch (err) {
    //             notificationHelper.showErrorNotification({description : err.response.data.message})
    //         };
    //     }
    //     fetchWarehouses();
    // }, []);

    // Get vehicles for options
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await vehicleApi.getAllVehicles();
                setVehicles(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchVehicles();
    }, []);

    // Get batches for options
    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await batchApi.getPackedBatch();
                setBatches(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchBatches();
    }, []);

    // Get address for options
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await partnerAddressApi.getAllAddresses();
                setAddresses(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            };
        }
        fetchAddresses();
    }, []);

    const initialValues = {
        vehicleId: null,
        shipmentBatches: [initialShipmentBatchValues],
	};

    const formik = useFormik({
		initialValues: initialValues,
		// validationSchema: shipmentValidationSchema,
		onSubmit: (values) => {},
	});
    
    const [shipmentBatches, setShipmentBatches] = useState(formik.values.shipmentBatches);
    
    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

     // BeforSave: validate
     useEffect(() => {
        if (setBeforeSave) {
            setBeforeSave(() => formik.submitForm());
        }
    }, [setBeforeSave, formik]);

    const vehicleOptions = inputHelper.convertArrToSelectOption(vehicles);
    const batchOptions = inputHelper.convertArrToSelectOption(batches);

    // Handle select batch 
    const handleSelectBatch = (key, batchId) => {
        // Get selected item of shipmentBatches
        const itemSelect = shipmentBatches.find((item) => item.key === key);
        
        // Update item info by seletec batch
        const selectedBatch = batches.find(p => p.id === batchId);
        const partner = selectedBatch.partner;
        const partnerAddresses = addresses.filter((address) => address.partnerId === partner.id);

        if (selectedBatch) {
            itemSelect.batchId = batchId;
            itemSelect.partnerName = partner.name;
            itemSelect.addressOptions = inputHelper.convertArrToSelectOption(partnerAddresses);
        }

        // Update
        updateShipmentBatches(itemSelect);
    }

    // Handle select addresss 
    const handleSelectAddress = (key, addressId) => {
        // Get selected item of shipmentBatches
        const itemSelect = shipmentBatches.find((item) => item.key === key);
        
        // Update item info by seletec address
        const selectedAddress = addresses.find(p => p.id === addressId);

        if (selectedAddress) {
            itemSelect.partnerAddressId = selectedAddress.id;
        }

        // Update
        updateShipmentBatches(itemSelect);
    }

    // Handle add new shipment_batch
    const handeAddBatch = () => {
		const newItem = {
			...initialShipmentBatchValues,
			key: shipmentBatches.length,
		};
		setShipmentBatches([...shipmentBatches, newItem]);
		formik.setFieldValue("shipmentBatches", [...shipmentBatches, newItem]);
	};

      // Handle delete batch
	const handleDeleteBatch = (key) => {
		const newItems = shipmentBatches.filter((item) => item.key !== key);
		setShipmentBatches(newItems.length === 0 ? [initialShipmentBatchValues] : newItems);
		formik.setFieldValue("shipmentBatches", shipmentBatches);
	};

    // Handle update shipmentBatches when a batch change
    const updateShipmentBatches = (newItem) => {
        const newItems = shipmentBatches.map((item) => {
			if (item.key === newItem.key) {
				return { ...newItem };
			}
			return item;
		});
		setShipmentBatches(newItems);
		formik.setFieldValue("shipmentBatches", newItems);
    }

    return (
        <SharedForm.FormBody>


            {/* Vehicle and date */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="vehicleId">Shipment vehicle</SharedInput.Label>
                <SharedInput.SelectInput
                    name="vehicleId"
                    showSearch
                    options={vehicleOptions}
                    mode="multiple"
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="Please choose vehicles"
                    onChange={(value) => console.log(value)}
                    onBlur={formik.handleBlur}
                    value={formik.values.vehicleId}
                    error={formik.touched.vehicleId && formik.errors.vehicleId}
                />
            </SharedForm.FormBodyItem>	
                 
            {/* Shipment Batches */}
            <Divider orientation="left" orientationMargin={0}>Shipment Batches</Divider>
            {/* Order Item */}
            <Row gutter={24}>
                <Col span={7}>
                    <SharedInput.Label>Batch</SharedInput.Label>
                </Col>
                {/* Category */}
                <Col span={7}>
                    <SharedInput.Label>Partner</SharedInput.Label>
                </Col>
                {/* Unit */}
                <Col span={7}>
                    <SharedInput.Label>Address</SharedInput.Label>
                </Col>
                {/* Delete button */}
                <Col span={3}>
                </Col>
            </Row>
            {
                shipmentBatches.map((item, index) => (
                    <Row gutter={24} key={item.key }>
                    {/* Batch */}
                    <Col span={7}>
                        <SharedInput.SelectInput
                            name="batchId"
                            showSearch
                            options={batchOptions}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please choose a batch"
                            onChange={(value) => handleSelectBatch(item.key, value)}
                            value={item.productId}
                        />
                    </Col>
                    {/* Partner name */}
                    <Col span={7}>
                        <SharedInput.Text 
                            value={item.partnerName}
                            disabled
                        />
                    </Col>
                    {/* Address */}
                    <Col span={7}>
                        <SharedInput.SelectInput 
                            name="partnerAddressId"
                            showSearch
                            options={item.addressOptions}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please choose a partner address"
                            onChange={(value) => handleSelectAddress(item.key, value)}
                            value={item.partnerAddressId}
                        />
                    </Col>
                    {/* Delete button */}
                    <Col span={3}>
                        <Button danger onClick={() => handleDeleteBatch(item.key)}>
                            <DeleteOutlined />
                        </Button>
                    </Col>
                </Row>
                ))
            }
             <SharedBtn.BtnSave 
                type="link"
                label="Add more batch"
                onClick={handeAddBatch}
            />
        </SharedForm.FormBody>
    )
}

export {FormCreateShipment, FormCreateShipmentVrp}