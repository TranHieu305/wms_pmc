import { PRODUCT_TYPE } from "../../utils/constants";
import { Col, Flex, Row, Table, Tag } from "antd";
import { DetailRow, DetailTitleBox } from "../ui/detail";
import addKeyToArrayData from "../../utils/addKeyToData";
import { Link } from "react-router-dom";
import DataHelper from "../../utils/DataHelper";
import FormatHelper from "../../utils/FormatHelper";
import ButtonSaveProductPrice from "../productprice/Buttons";

function ProductDetail({ product, prices, suppliers }) {
	const category = product.productCategory;
	const isMaterial = category.productType === PRODUCT_TYPE.MATERIAL;

	return (
		<article className="detail-page">
			<Row gutter={[24, 24]}>
				<Col span={16}>
					<div className="wrapper">
						<DetailTitleBox headline="Product" des="Product detail information" />
						<Row gutter={[24, 24]} style={{ minHeight: "200px" }}>
							{/* <Col span={8}>
								<ImageRenderer imageData={product.images} />
							</Col> */}
							<Col span={12}>
								<Flex gap={8} vertical>
									<DetailRow title="Name" data={product?.name || "---"} />
									<DetailRow title="Des" data={product?.description || "---"} />
									<DetailRow title="Uom" data={product?.uom || "---"} />
								</Flex>
							</Col>
							<Col span={12}></Col>
						</Row>
					</div>

					<div className="wrapper">
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<DetailTitleBox
								key="1"
								headline={isMaterial ? "Product Cost" : "Product Price"}
								des="Product Cost Detail"
							/>
							<ButtonSaveProductPrice
								product={product}
								partners={suppliers}
								label="Add price"
								type="primary"
							/>
						</div>

						<MaterialPrice key="material price" prices={prices} suppliers={suppliers} />
					</div>
				</Col>
				<Col span={8}>
					<div className="wrapper">
						<DetailTitleBox headline="Category" des="Product category information" />
						<div className="order-information-table">
							<DetailRow
								title="Type"
								data={[
									category?.productType ? (
										<ProductTypeTag type={category.productType} />
									) : (
										"---"
									),
								]}
							/>
							<DetailRow title="Name" data={category?.name || "---"} />
							<DetailRow title="Description" data={category?.description || "---"} />
						</div>
					</div>
				</Col>
			</Row>
		</article>
	);
}

function ProductDetailInfo({ product }) {
	return <></>;
}

function MaterialPrice({ prices, suppliers }) {
	prices = addKeyToArrayData(prices);
	const tableColumns = [
		{
			key: "name",
			title: "Supplier name",
			dataIndex: "id",
			width: "50%",
			render: (title, record) => (
				<Link to={"/suppliers/" + record.supplierId}>
					<p>{DataHelper.findObjNameFromArrById(suppliers, record.partnerId)}</p>
				</Link>
			),
		},
		{
			key: "price",
			title: "Unit price",
			dataIndex: "price",
			width: "25%",
			render: (title, record) => <>{FormatHelper.formatCurrency(record.price)}</>,
		},
		{
			key: "dateApply",
			title: "Date apply",
			dataIndex: "dateApply",
			render: (title, record) => <>{FormatHelper.formatDate(record.dateApply)}</>,
		},
	];
	return <Table dataSource={prices} columns={tableColumns} rowKey="key"></Table>;
}
function ProductionPrice({ prices }) {
	console.log(prices);
	return <p>123</p>;
}

function ProductTypeTag({ type, ...props }) {
	if (type === PRODUCT_TYPE.MATERIAL) {
		return (
			<Tag color="orange" {...props}>
				Material
			</Tag>
		);
	} else
		return (
			<Tag color="geekblue" {...props}>
				Production
			</Tag>
		);
}

export { ProductDetail, ProductTypeTag };
