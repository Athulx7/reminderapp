import React, { createContext, useState } from "react";
export const addNewReminderResponceContext = createContext();
function ContextShare({ children }) {
  const [addNewReminderRepsonce, setAddnewReminderResponce] = useState({});

  return (
    <>
      <addNewReminderResponceContext.Provider
        value={{ addNewReminderRepsonce, setAddnewReminderResponce }}
      >
        {children}
      </addNewReminderResponceContext.Provider>
    </>
  );
}

export default ContextShare;
