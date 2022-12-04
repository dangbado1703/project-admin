import { IFormSearchOrderCancel } from "../../model/OrderCancel.model";
import { IFormProps } from "../../model/utils";

const FormSearchCancel = ({
  setValueSearch,
  selectedRowKeys,
  valueSearch,
  setSelectedRowKeys,
}: Omit<
  IFormProps<IFormSearchOrderCancel>,
  "page" | "size" | "setPage" | "setSize"
>) => {
  return (
    <div>
    </div>
  );
};

export default FormSearchCancel;
