"use client";

import createCampground from "@/libs/createCampground";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddCampgroundPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [coordinate, setCoordinate] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [telephone, setTelephone] = useState("");
  const [region, setRegion] = useState("");
  const [picture, setPicture] = useState("");

  if (!session || !session.user.token) return null;
  const submit = () => {
    if (
      name &&
      coordinate &&
      picture &&
      province &&
      region &&
      postalcode &&
      telephone
    ) {
      const addCampground = async () => {
        await createCampground(
          session.user.token,
          name,
          coordinate,
          province,
          postalcode,
          telephone,
          region,
          picture
        );
      };
      addCampground();
      alert("Successfully added!");
      router.push("/campground");
    } else {
      alert("Please fill in the missing field!");
    }
  };

  return (
    <main className="text-left mx-[20%] pb-5">
      <div className="text-4xl font-bold mt-[8%] ">Add new campground</div>
      <div className="w-full my-10">
        <label className="w-auto block text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          required
          id="name"
          name="name"
          placeholder="Type the name of campground here"
          className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="w-full my-10">
        <label className="w-auto block text-gray-700" htmlFor="coor">
          Coordinate
        </label>
        <input
          type="text"
          required
          id="coor"
          name="coor"
          placeholder="Type the coordinate here"
          className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
          value={coordinate}
          onChange={(e) => setCoordinate(e.target.value)}
        ></input>
      </div>
      <div className="w-full my-10">
        <label className="w-auto block text-gray-700" htmlFor="picture">
          Picture
        </label>
        <input
          type="text"
          required
          id="picture"
          name="picture"
          placeholder="Type the source of image here"
          className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        ></input>
      </div>
      <div className="flex my-10">
        <div className="w-1/2">
          <label className="w-full block text-gray-700" htmlFor="province">
            Province
          </label>
          <input
            type="text"
            required
            id="province"
            name="province"
            placeholder="Type the province here"
            className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          ></input>
        </div>
        <div className="w-1/2 ml-5">
          <label className="w-auto block text-gray-700" htmlFor="region">
            Region
          </label>
          <input
            type="text"
            required
            id="region"
            name="region"
            placeholder="Type the region here"
            className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex my-10">
        <div className="w-1/2">
          <label className="w-full block text-gray-700" htmlFor="postal">
            Postal Code
          </label>
          <input
            type="text"
            required
            id="postal"
            name="postal"
            placeholder="Type the postal code here"
            className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
            value={postalcode}
            onChange={(e) => setPostalcode(e.target.value)}
          ></input>
        </div>
        <div className="w-1/2 ml-5">
          <label className="w-auto block text-gray-700" htmlFor="tel">
            Phone Number
          </label>
          <input
            type="text"
            required
            id="tel"
            name="tel"
            placeholder="Type the phone number here"
            className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="text-center">
        <button
          className="bg-white border-[2px] border-red-500 px-8 py-1 mr-10 text-red-500 font-medium rounded-full hover:bg-red-500 hover:text-white"
          onClick={() => {
            setName("");
            setCoordinate("");
            setProvince("");
            setPostalcode("");
            setTelephone("");
            setRegion("");
            setPicture("");
          }}
        >
          Cancel
        </button>
        <button
          className="border-[2px] border-emerald-500 bg-white hover:bg-emerald-500 px-10 py-1 text-emerald-500 hover:text-white font-medium rounded-full"
          onClick={submit}
        >
          Add
        </button>
      </div>
    </main>
  );
}
