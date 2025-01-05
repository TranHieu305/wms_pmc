import { AutoComplete, DatePicker, Input, Mentions, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function Label({forName, children}) {
    return (
    <label className="block text-[rgba(33,43,54,1)] text-[14px] font-normal leading-[22px] pb-1"
            htmlFor={forName}>
        {children}
    </label>)
}

function Text({...props}) {
    return (
        <>
            <Input {...props} />
            {props.error && <InputError message={props.error}/>}
        </>
    )
}

function TextPassword({...props}) {
    return(
        <>
            <Input.Password {...props} />
            {props.error && <InputError message={props.error}/>}
        </>
    )
}

function TextAreaCustom({...props}) {
    return (
        <>
            <TextArea 
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                rows={4} 
                {...props}
            />
            {props.error && <InputError message={props.error}/>}
        </>
    )
}

function SelectInput({value, onChange, options,...props}) {
    return (
        <>
            <Select key={"select" + value} 
                value={value} 
                onChange={(value) => onChange(value)} 
                options={options}
                {...props} 
            />
            {props.error && <InputError message={props.error}/>}
        </>
	);
}

function DatePickerCustom({value, onChange, options,...props}) {
    return (
        <> 
            <DatePicker key={"date-picker" + value}
                value={value} 
                onChange={(value) => onChange(value)} 
                {...props}
            />
            {props.error && <InputError message={props.error}/>}
        </>
    )
}

function UserMention({value, onChange, options, ...props}) {
    const users = useSelector((state) => state.users.userList || []);    
    if (!options) {
        options = users.map(user => ({
            value: user.username || '',
            label: (<div>{user.username} - {user.fullName}</div>)
        }))
    }
    return (
        <>
            <Mentions 
                value={value}
                onChange={value => onChange(value)}
                options={options}
              
                style={{
                    width: '100%',
                }}
                {...props}
            />
            {props.error && <InputError message={props.error}/>}
        </>
    )
}

const MapWrapper = () => {
    const map = useMap();
  
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize(); // Recalculate map size
      }, 300); // Delay to ensure proper rendering
    }, [map]);
  
    return null;
  };

function Location({...props}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    // Function to fetch search results
    const fetchSearchResults = async (term) => {
      if (!term || term.length <= 2) return [];
      try {
        setLoading(true); // Set loading state
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            term
          )}&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        return data.map((result) => ({
            value: result.display_name,
            lat: parseFloat(result.lat),
            lon: parseFloat(result.lon),
        }));
      } catch (error) {
        console.error("Error fetching search results:", error); // Debugging
        return [];
      } finally {
        setLoading(false); // Reset loading state
      }
    };
  
    // Effect to fetch results when the search term changes
    useEffect(() => {
      const fetchResults = async () => {
        if (searchTerm.length > 2) {
            const results = await fetchSearchResults(searchTerm);
            setSearchResults(results); // Update state with results
        } else {
            setSearchResults([]); // Clear results for short inputs
        }
      };
      fetchResults();
    }, [searchTerm]); // Runs whenever searchTerm changes
  
    // Handle location selection
    const handleLocationSelect = (value, option) => {
      console.log("Selected location:", option); // Debugging
      setSelectedLocation({
        lat: option.lat,
        lon: option.lon,
      });
    };

  return (
    <div>
      {/* Search Input */}
        <AutoComplete
            style={{ width: "100%", marginBottom: "10px" }}
            options={searchResults}
            onSearch={(value) => setSearchTerm(value)} // Update search term
            onSelect={handleLocationSelect} // Handle selection
            placeholder="Search for a location"
            loading={loading}
        >
            <Input />
        </AutoComplete>

      {/* Map */}
        {/* <div style={{ height: "300px", width: "100%" }}>
            <MapContainer
                center={selectedLocation || [51.505, -0.09]} // Default center
                zoom={selectedLocation ? 15 : 5}
                style={{ height: "100%", width: "100%" }}
            >
                <MapWrapper />
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {selectedLocation && (
                <Marker position={[selectedLocation.lat, selectedLocation.lon]} />
                )}
            </MapContainer>
        </div> */}
    </div>
  );
    
}

function InputError({ message }) {
    return (
        <div className={`max-w-full flex flex-row items-start justify-start gap-1 leading-[normal] tracking-[normal] text-left text-sm text-sate-error font-montserrat`}>
            <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0 box-border max-w-[calc(100%_-_28px)]">
                <div className="relative leading-[150%] text-[#FF5630]">
                    {message}
                </div>
            </div>
         </div>
    )
}

const SharedInput = {
    Text,
    TextAreaCustom,
    Label,
    SelectInput, 
    DatePickerCustom,
    TextPassword,
    Location,
    UserMention
}

export default SharedInput;