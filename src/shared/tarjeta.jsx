const Tarjeta = ({ label, content, color }) => {
  return (
    <div className="col-md-6">
      <div className={`card p-4 mb-3 text-white bg-${color}`}>
        <h4 className="text-center">{label}</h4>
        <p className="text-center display-6">{content}</p>
      </div>
    </div>
  );
};

export default Tarjeta;
