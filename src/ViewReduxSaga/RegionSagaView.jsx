import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteRegionRequest, GetRegionRequest } from "../ReduxSaga/Action/RegionAction";
import FormikSagaRegion from "./FormikSagaRegion";
import UpdateRegion from "./UpdateRegion";
export default function RegionSagaView() {
  const dispatch = useDispatch();
  const { regions } = useSelector((state) => state.regionState);
  const [display, setDisplay] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit]= useState(false);
  const [regID, setRegID]= useState(0);

  useEffect(() => {
    dispatch(GetRegionRequest());
  }, [dispatch]);

  const onEdit = async (id) => {
    setRegID(id);
    setEdit(true);
  }

  const onDelete = async (id) => {
    dispatch(DeleteRegionRequest(id))
    setRefresh(true)
  };

  return (
    <div>
      {display ? (
        <FormikSagaRegion setDisplay={setDisplay} setRefresh={setRefresh} />
      ) : (
        <>
          <h2>List Regions</h2>
          <button onClick={() => setDisplay(true)}>Add Region</button>
          <table>
            <th>Region ID</th>
            <th>Region Name</th>
            <th>Action</th>
            <tbody>
              {regions &&
                regions.map((reg) => (
                  <tr key={reg.regionId}>
                    <td>{reg.regionId}</td>
                    <td>{reg.regionName}</td>
                    <td>
                      <button onClick={() => onDelete(reg.regionId)}>Delete</button>
                    </td>
                    <td>
                      <button onClick={() => onEdit(reg.regionId)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {edit && <UpdateRegion setEdit={setEdit} setRefresh={setRefresh} regID={regID}/>}
        </>
      )}
    </div>
  );
}
