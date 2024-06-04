import "../../styles/pages/detailpage.css";
import "./index.css";
import { Col, Divider, Row, Steps, Tag } from "antd";
import { DetailRow, DetailTitleBox } from "../ui/detail";
import FormatHelper from "../../utils/FormatHelper";
import { OrderItemBoardInOrderDetail } from "../orderitem/Boards";
import { MATERIAL_ORDER_STATUS } from "../../utils/constants/order";

function MaterialOrderDetail({ detail }) {
	return (
		<article className="material-order-detail-page">
			<Row gutter={[24, 24]}>
				<Col span={16}>
					<div className="wrapper">
						<DetailTitleBox headline="Progress" des="Current order status" />
						<MaterialOrderProgress currentStatus={detail.status} />
					</div>

					<div className="wrapper">
						<DetailTitleBox headline="Products" des="Your shipment" />
						<OrderItemBoardInOrderDetail itemList={detail.orderItems} />
					</div>
				</Col>
				<Col span={8}>
					<div className="wrapper">
						<DetailTitleBox headline="Payment" des="Final payment amount" />
						<div className="order-information-table">
							<DetailRow
								title="SubTotal"
								data={FormatHelper.formatCurrency(detail.totalOrderCost)}
							/>
							<DetailRow
								title="Tax(8%)"
								data={FormatHelper.formatTaxRate(detail.tax)}
							/>
							<Divider />
							<DetailRow
								title="Total"
								data={FormatHelper.formatCurrency(
									detail.totalOrderCost + detail.totalOrderCost * detail.tax
								)}
								main
							/>
						</div>
					</div>
					<div className="wrapper">
						<DetailTitleBox headline="Supplier" des="Information Detail" />
						<div className="order-information-table">
							<DetailRow title="Supplier name" data={detail.partnerName || "---"} />
							<DetailRow title="Supplier email" data={detail.partnerEmail || "---"} />
							<DetailRow title="Supplier phone" data={detail.partnerPhone || "---"} />
							<DetailRow
								title="Supplier address"
								data={detail.partnerAddress || "---"}
							/>
						</div>
					</div>
				</Col>
			</Row>
		</article>
	);
}

function MaterialOrderProgress() {
	const description = "This is a description";

	return (
		<Steps
			current={1}
			status="error"
			items={[
				{
					title: "Finished",
					description,
				},
				{
					title: "In Process",
					description,
				},
				{
					title: "Waiting",
					description,
				},
			]}
		/>
	);
}

function MaterialOrderStatusTag({ status }) {
	let tag;
	switch (status) {
		case MATERIAL_ORDER_STATUS.CREATED:
			tag = <Tag color="blue">Created</Tag>;
			break;
		case MATERIAL_ORDER_STATUS.APPROVED:
			tag = <Tag color="green">Approved</Tag>;
			break;
		case MATERIAL_ORDER_STATUS.IN_TRANSIT:
			tag = <Tag color="orange">In transit</Tag>;
			break;
		case MATERIAL_ORDER_STATUS.DELIVERED:
			tag = <Tag color="teal">Fully Delivered</Tag>;
			break;
		case MATERIAL_ORDER_STATUS.CANCELLED:
			tag = <Tag color="gray">Cancelled</Tag>;
			break;
		default:
			tag = <p>---</p>;
	}
	return tag;
}

export { MaterialOrderDetail, MaterialOrderStatusTag };
