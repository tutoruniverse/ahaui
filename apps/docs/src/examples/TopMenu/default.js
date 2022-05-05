() => {
  const [current, setCurrent] = useState('products.querychat.queryai');
  return (
    <TopMenu
      current={current}
      onSelect={setCurrent}
    >
      <TopMenu.Item eventKey="home">Home</TopMenu.Item>
      <TopMenu.SubMenu eventKey="products" badge={() => <Badge variant="positive_subtle">New</Badge>} title="Products">
        <TopMenu.Item eventKey="excelchat">Excelchat</TopMenu.Item>
        <TopMenu.SubMenu badge={() => <Badge variant="positive_subtle">New</Badge>} eventKey="querychat" title="Querychat">
          <TopMenu.Item eventKey="sqlquerychat">SQLQuerychat</TopMenu.Item>
          <TopMenu.Item eventKey="queryai">QueryAI</TopMenu.Item>
        </TopMenu.SubMenu>
        <TopMenu.Item eventKey="knp" disabled>KNP Project</TopMenu.Item>
      </TopMenu.SubMenu>
      <TopMenu.Item eventKey="platform" badge={() => <Badge variant="positive_subtle">New</Badge>}>Platform</TopMenu.Item>
      <TopMenu.Item eventKey="press" disabled>Press</TopMenu.Item>
      <TopMenu.SubMenu eventKey="blog" title="Blog">
        <TopMenu.Item eventKey="excel_tutorial">Excel Tutorial</TopMenu.Item>
        <TopMenu.Item eventKey="excel_help">Excel Help</TopMenu.Item>
        <TopMenu.Item eventKey="excel_problems">Excel Problems</TopMenu.Item>
        <TopMenu.Item eventKey="sql_tutorial">SQL Tutorial</TopMenu.Item>
      </TopMenu.SubMenu>
      <TopMenu.Item eventKey="about" disabled>About</TopMenu.Item>
    </TopMenu>
  );
};
