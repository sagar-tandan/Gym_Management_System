using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class DashboardDto
    {
        public int TotalMember { get; set; }
        public int TotalPlan { get; set; }
        public int TodayRegistered { get; set; }
        public string? PlanWithHighestCount { get; set; }
        public int TotalEquip { get; set; }
        public int DefectEquip { get; set; }
    }
}