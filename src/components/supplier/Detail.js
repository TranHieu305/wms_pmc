import "../../styles/pages/detailpage.css";
import { Col, Flex, Image, Row, Table, Tag } from "antd";
import { DetailRow, DetailTitleBox } from "../ui/detail";
import addKeyToArrayData from "../../utils/addKeyToData";
import { Link } from "react-router-dom";
import DataHelper from "../../utils/DataHelper";
import FormatHelper from "../../utils/FormatHelper";

import SupplierActions from "./Actions";
import convertTimestamp from "../../utils/convertTimestamp";

function SupplierDetail({ supplier, productPrices, orders }) {
	if (!supplier) {
		return;
	}
	return (
		<article className="detail-page">
			<Row gutter={[24, 24]}>
				<Col span={16}>
					<div className="wrapper">
						<DetailTitleBox headline="Product" des="Product detail information" />
						{/* <ProductDetailInfo product={product} /> */}
					</div>

					<div className="wrapper">
						<DetailTitleBox
							key="1"
							headline={"Product Cost"}
							des="Product Cost Detail"
						/>
						{/* <MaterialPrice key="material price" prices={prices} suppliers={suppliers} /> */}
					</div>
				</Col>
				<Col span={8}>
					<div className="wrapper">
						<DetailTitleBox headline="Supplier" des="Supplier information" />
						<div className="order-information-table">
							<DetailRow title="Name" data={supplier.name || "---"} />
							<DetailRow title="Address" data={supplier.address || "---"} />
							<DetailRow title="Email" data={supplier.email || "---"} />
							<DetailRow title="Phone number" data={supplier.phone || "---"} />
							<DetailRow title="Description" data={supplier.description || "---"} />
						</div>
					</div>
				</Col>
			</Row>
		</article>
	);
}

export default SupplierDetail;
