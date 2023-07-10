import React, { useEffect, useState } from "react";
import RegionApi from "../api/RegionApi";
import RegionCreate from "./RegionCreate";
import RegionUpdate from "./RegionUpdate";

export default function RegionViewApi() {
  const [region, setRegion] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [display, setDisplay] = useState(false);
  const [edit, setEdit]= useState(false);
  const [regID, setRegID]= useState(0);
  useEffect(() => {
    RegionApi.list().then((data) => {
      setRegion(data);
    });
    setRefresh(false);
  }, [refresh]);
  const onDelete = async (id) => {
    RegionApi.deleted(id).then(() => {
      window.alert("Data successfully deleted");
      setRefresh(true);
    });
  };
  const onEdit = async (id) => {
    setRegID(id);
    setEdit(true);
  }
  return (
    <div>
      {display ? (
        <RegionCreate setRefresh={setRefresh} setDisplay={setDisplay} />
      ) : (
        <>
          <h2>List Regions</h2>
          <button onClick={() => setDisplay(true)}>Add Regions</button>
          <table>
            <th>Region ID</th>
            <th>Region Name</th>
            <th>Action</th>
            <tbody>
              {region &&
                region.map((reg) => (
                  <tr key={reg.regionId}>
                    <td>{reg.regionId}</td>
                    <td>{reg.regionName}</td>
                    <td>
                      <button onClick={() => onDelete(reg.regionId)}>
                        Delete
                      </button>
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
          {edit && <RegionUpdate setEdit={setEdit} setRefresh={setRefresh} regID={regID}/>}
          
        </>
      )}
    </div>
  );
}
