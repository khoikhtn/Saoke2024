export const formObjects = [
  {
    label: 'Tìm kiếm',
    type: 'text',
    id: 'detail',
    placeholder: 'Search term'
  },
  {
    label: 'Từ ngày',
    type: 'date',
    id: 'start_date',
    placeholder: 'Từ ngày'
  },
  {
    label: 'Đến ngày',
    type: 'date',
    id: 'end_date',
    placeholder: 'Đến ngày'
  },
  {
    label: 'Sắp xếp theo',
    type: 'select',
    id: 'sort_by',
    options: [
      { value: 'Date', label: 'Ngày' },
      { value: 'Amount', label: 'Số tiền' }
    ]
  },
  {
    label: 'Thứ tự sắp xếp',
    type: 'select',
    id: 'sort_order',
    options: [
      { value: 'ASC', label: 'Tăng dần' },
      { value: 'DESC', label: 'Giảm dần' }
    ]
  },
  {
    label: 'Khoảng số tiền',
    type: 'select',
    id: 'amount_range',
    options: [
      { value: '0', label: 'Tất cả số tiền VND' },
      { value: '1', label: '0 đến 100,000 VND' },
      { value: '2', label: '100,000 đến 500,000 VND' },
      { value: '3', label: '500,000 đến 1,000,000 VND' },
      { value: '4', label: '1,000,000 đến 5,000,000 VND' },
      { value: '5', label: '5,000,000 đến 10,000,000 VND' },
      { value: '6', label: '10,000,000 đến 50,000,000 VND' },
      { value: '7', label: 'Trên 50,000,000 VND' },
    ]
  }
]