import React, { useState } from "react";
import { RoomProvider, useMutation } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

function SchemaValidationDemo() {
  const [propertyKey, setPropertyKey] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [propertyType, setPropertyType] = useState<Types>("number");

  const setStorageValue = useMutation(
    ({ storage }, e) => {
      e.preventDefault();
      try {
        storage.set(propertyKey, convertToType(propertyValue, propertyType));
      } catch (err) {
        console.log(err);
      }
    },
    [propertyKey, propertyValue, propertyType]
  );

  return (
    <div className="flex place-items-center place-content-center w-full h-screen select-none">
      <div>
        <h1 className="pb-3 text-lg">
          Set property in <code>`Storage`</code>
        </h1>
        <form
          onSubmit={setStorageValue}
          className="flex gap-3 justify-center items-end"
        >
          <div>
            <label className="block text-sm" htmlFor="key">
              Key
            </label>
            <input
              id="key"
              name="key"
              className="mt-1.5 outline-purple-600 !bg-transparent shadow-sm border rounded-md px-3 py-2 text-base h-10"
              type="text"
              value={propertyKey}
              onChange={(e) => setPropertyKey(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm" htmlFor="type">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="mt-1.5 outline-purple-600 !bg-transparent shadow-sm border rounded-md px-2 py-2 text-base h-10"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as Types)}
              autoComplete="off"
            >
              <option value="number">number</option>
              <option value="string">string</option>
            </select>
          </div>
          <div>
            <label className="block text-sm" htmlFor="value">
              Value
            </label>
            <input
              id="value"
              name="value"
              className="mt-1.5 outline-purple-600 !bg-transparent shadow-sm border rounded-md px-3 py-2 text-base h-10"
              type="text"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button className="mt-1.5 outline-purple-600 bg-[#2f2640] text-white shadow-sm border border-[#2f2640] rounded-md px-3 pt-0.5 text-base h-10 font-semibold hover:bg-[#1a1523] active:bg-[#1a1523]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

type Types = "string" | "number";

function convertToType(input: string, newType: Types) {
  if (newType === "string") {
    return `${input}`;
  }

  if (newType === "number") {
    return Number(input);
  }
}

export default function Page() {
  return (
    <RoomProvider
      id={"my-room"}
      initialPresence={{}}
      initialStorage={{ count: 7 }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => (
          <>
            <SchemaValidationDemo />
            {/*<AvatarStack />*/}
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
