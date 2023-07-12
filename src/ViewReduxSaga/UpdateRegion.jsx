import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { UpdateRegionRequest } from "../ReduxSaga/Action/RegionAction";

export default function UpdateRegion(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      id: undefined,
    },
    onSubmit: async (values) => {
        const id=props.regID;
        let payload = new FormData();
        payload.append("name", values.name);
        payload.append("id", id);
        dispatch(UpdateRegionRequest(payload));
        props.setRefresh(true);
        props.setEdit(false)
        window.alert(`Data Successfully Update`);
    },
  });
  
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Update Region</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        ></input>
      </div>
      <div>
        <div>
          <button type="submit">
            Simpan
          </button>
          <button onClick={() => props.setEdit(false)}>
            Cancel
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}
