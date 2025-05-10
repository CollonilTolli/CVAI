import dynamic from "next/dynamic";
const TemplateComponent = dynamic(() => import("template/src/app/page"));

 const Template = () => {
  return (
    <div className="">
      <TemplateComponent />
    </div>
  );
};
export default Template;