const data = [
    { id: 1000, name: '資產', is_debit: 1, parent_id: null, amount: 0 },
    { id: 1100, name: '流動資產', is_debit: 1, parent_id: 1000, amount: 0 },
    { id: 1101, name: '現金', is_debit: 1, parent_id: 1100, amount: -4000 },
    { id: 1102, name: '股票', is_debit: 1, parent_id: 1100, amount: 0 },
    { id: 1103, name: '應收帳款', is_debit: 1, parent_id: 1100, amount: 0 },
    { id: 1104, name: '其他', is_debit: 1, parent_id: 1100, amount: 0 },
    { id: 1200, name: '非流動資產', is_debit: 1, parent_id: 1000, amount: 0 },
    { id: 1201, name: '車子', is_debit: 1, parent_id: 1200, amount: 10000 },
    { id: 1202, name: '房子', is_debit: 1, parent_id: 1200, amount: 0 },
    { id: 1203, name: '3C', is_debit: 1, parent_id: 1200, amount: 0 },
    { id: 1204, name: '家電', is_debit: 1, parent_id: 1200, amount: 0 },
    { id: 1205, name: '預付款', is_debit: 1, parent_id: 1200, amount: 0 },
    { id: 1206, name: '其他', is_debit: 1, parent_id: 1200, amount: 0 },
    { id: 2000, name: '負債', is_debit: 0, parent_id: null, amount: 0 },
    { id: 2100, name: '流動負債', is_debit: 0, parent_id: 2000, amount: 0 },
    { id: 2101, name: '信用卡費', is_debit: 0, parent_id: 2100, amount: 0 },
    { id: 2102, name: '應付帳款', is_debit: 0, parent_id: 2100, amount: 0 },
    { id: 2103, name: '其他', is_debit: 0, parent_id: 2100, amount: 0 },
    { id: 2200, name: '非流動負債', is_debit: 0, parent_id: 2000, amount: 0 },
    {
      id: 2201,
      name: '分期付款',
      is_debit: 0,
      parent_id: 2200,
      amount: -6000
    },
    { id: 2202, name: '車貸', is_debit: 0, parent_id: 2200, amount: 0 },
    { id: 2203, name: '房貸', is_debit: 0, parent_id: 2200, amount: 0 },
    { id: 2204, name: '其他', is_debit: 0, parent_id: 2200, amount: 0 },
    { id: 3000, name: '權益', is_debit: 0, parent_id: null, amount: 0 },
    { id: 3100, name: '保留盈餘', is_debit: 0, parent_id: 3000, amount: 0 },
    { id: 3200, name: '當期損益', is_debit: 0, parent_id: 3000, amount: 0 }
  ]
  
function buildHierarchy(items, parentId) {
    const children = items.filter(item => item.parent_id === parentId);
    if (children.length === 0) return [null, 0];
  
    const hierarchy = [];
    let total = 0;
    for (const child of children) {
      const [subHierarchy, subtotal] = buildHierarchy(items, child.id);
      child.amount = parseInt(child.amount)+subtotal
      hierarchy.push({
        id: child.id,
        name: child.name,
        is_debit: child.is_debit,
        amount: child.amount,
        children: subHierarchy,
      });
      total += child.amount;
    }
    return [hierarchy, total];
}
  
  
  const [rootHierarchy, total] = buildHierarchy(data, null);
  console.log(JSON.stringify(rootHierarchy, null, 2));
  