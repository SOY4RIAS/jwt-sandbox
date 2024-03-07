import { Editor } from "@monaco-editor/react";
import { useForm } from "react-hook-form";
import { useSendRequest } from "../hooks/useSendRequest";
import { DisplaConf } from "./DisplayConf";
import { useConfigStore } from "../store/config";
import { useEffect } from "react";
import { useApiService } from '../hooks/useApiService';

export type Request<B = any> = {
  path?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: B;
};

export function ApiTester() {
  const { origin } = useConfigStore((state) => state.config);
  const { handleSubmit, register, setValue } = useForm<Request>({
    values: {
      path: origin ? "/api/login.json" : "",
      method: "POST",
    },
  });

  const { mutate } = useSendRequest((data) => {
    console.log(data)
  });

  

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutate(data);
  });

  useEffect(() => {
    if (origin) {
      setValue("path", "/api/login.json", {
        shouldDirty: true,
      });
    }
  }, [origin, setValue]);

  return (
    <section className="px-4 flex md:flex-row flex-col">
      <DisplaConf />
      <div>
        <h1 className="text-4xl font-bold text-primary transition-all duration-200 hover:text-blue-600 transform-gpu hover:animate-pulse origin-top">
          Api Tester
        </h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <span className="transition-transform duration-300 inline-block transform-gpu hover:scale-110">
              Endpoint Path
            </span>
            <input
              type="text"
              placeholder={origin? "/api/login.json" : "Enter endpoint path"}
              className="px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full outline-none transition-all duration-300"
              {...register("path", {
                value: origin ? "/api/login.json" : "",
              })}
              disabled={origin}
            />
          </label>
          <select
            className="block w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline appearance-none transition-all duration-300 border-none"
            id="method"
            {...register("method")}
            disabled={origin}
          >
            <option className="text-gray-700" value="">
              Method
            </option>
            <option className="text-gray-700" value="get">
              GET
            </option>
            <option className="text-gray-700" value="post" selected={origin}>
              POST
            </option>
            <option className="text-gray-700" value="put">
              PUT
            </option>
            <option className="text-gray-700" value="delete">
              DELETE
            </option>
          </select>
          <div className="mb-6"></div>
          <label>
            <span className="transition-transform duration-300 inline-block transform-gpu hover:scale-110">
              Body
            </span>
            <Editor
              height={300}
              language="json"
              theme="vs-dark"
              options={{
                cursorStyle: "line",
                cursorBlinking: "smooth",
                autoIndent: "full",
                codeLens: true,
                contextmenu: true,
                accessibilityPageSize: 10,
                fontLigatures: true,
                rulers: [80],
                scrollbar: {
                  vertical: "visible",
                  useShadows: true,
                },
              }}
              defaultValue={'{ "key": "value" }'}
              onChange={(e) => {
                setValue("body", e);
              }}
            />
          </label>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
