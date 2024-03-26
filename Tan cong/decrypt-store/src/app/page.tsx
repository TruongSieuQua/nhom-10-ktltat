"use client";
import Image from "next/image";
import { useState } from "react";
import { encryptTransform } from 'redux-persist-transform-encrypt';

export default function Home() {
  const [storeKey, setStoreKey] = useState<string>("// configuration encryption");
	const [result, setResult] = useState<any | undefined>();

  function handleSubmit(formData: FormData) {
    const encryptedData = {
      text: formData.get("text") as string,
      private_key: formData.get("private_key") as string,
    };

    const transform = encryptTransform({
      secretKey: encryptedData.private_key,
    })
    const { in: input, out } = transform;

    const decryptedData = out(encryptedData.text, encryptedData.private_key, null);
    if(!decryptedData) {
      alert("Cannot decrypt the text. Please check your private key.");
    }else{
      console.log(decryptedData);
      setResult(decryptedData);
    }
  }

  return (
    <main className="w-96 m-auto mt-24 space-y-6">
      <form action={handleSubmit} className="flex flex-col gap-3 ">
        <h1 className="text-bold text-3xl">Form</h1>
        <div className="space-x-4">
          <label htmlFor="text" className="block mb-2 font-medium text-gray-900 dark:text-white">Ecrypted text: </label>
          <input type="text" name="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="space-x-4">
        <label htmlFor="private_key" className="block mb-2 font-medium text-gray-900 dark:text-white">Private key: </label>
        <input type="text" name="private_key" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="ml-4 mt-2"><input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" /></div>

      </form>
      <hr />
      <div>
        <h1 className="text-2xl">Result</h1>
        <div>
          <pre className="text-nowrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
