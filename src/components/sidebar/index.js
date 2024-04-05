import { Boxes } from "lucide-react";
import { Menu, MenuItem } from "../ui/menu";

export default function Sidebar({}) {
	return (
		<>
			<Menu>
				<MenuItem icon={<Boxes size={20} />} text="Users" />
				<MenuItem icon={<Boxes size={20} />} text="Users" />
				<MenuItem icon={<Boxes size={20} />} text="Users" />
				<MenuItem icon={<Boxes size={20} />} text="Users" />
				<MenuItem icon={<Boxes size={20} />} text="Users" />
			</Menu>
		</>
	);
}
