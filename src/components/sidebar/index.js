import { Boxes } from "lucide-react";
import { Menu, MenuItem } from "../ui/menu";

export default function Sidebar() {
	return (
		<>
			{/* header */}

			<p>Hello World</p>
			<Menu>
				<MenuItem icon={<Boxes />} title="Home" path="home" />
				<MenuItem icon={<Boxes />} title="Home" />
				<MenuItem icon={<Boxes />} title="Home" />
			</Menu>
		</>
	);
}
