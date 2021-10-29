import { useState, useEffect } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalFading, setModalFading] = useState(false);

  //hide modal after fade out animation finishes
  useEffect(() => {
    setTimeout(() => {
      setShowModal(false);
      setModalFading(false);
    }, 500);
  }, [modalFading]);

  const hideModal = () => {
    setModalFading(true);
  };

  return {
    show: showModal,
    setShow: setShowModal,
    fading: modalFading,
    hide: hideModal,
  };
};

export default useModal;
