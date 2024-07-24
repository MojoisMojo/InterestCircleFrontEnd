
export default function AboutUsPage() {
  return (
    <div className="max-w-4xl"
      style={{
        height: 'calc(100vh - 64px)', // 使用视口高度单位确保div占满整个视口高度
        margin: 'auto',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', // 用于沿主轴（此处为垂直）居中
        alignItems: 'center', // 用于沿交叉轴（此处为水平）居中
      }}
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">About Us</h2>
      <p className="text-lg text-center text-gray-600">
        Connect Us at <a href="mailto:interestcircle@163.com"
          className="text-indigo-600 hover:text-indigo-800">interestcircle@163.com</a>
      </p>
      <br />
      <p className="text-lg text-center text-gray-600">
        Join Us at <a href="mailto:joininterestcircle@163.com"
          className="text-indigo-600 hover:text-indigo-800">joininterestcircle@163.com</a>
      </p>
    </div>
  );
}