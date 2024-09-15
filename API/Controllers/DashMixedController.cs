using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using API.DTOs;
using API.Migrations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashMixedController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public DashMixedController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDedicatedFeatures()
        {

            var today = DateTime.Today;
            string formattedToday = today.ToString("yyyy-MM-dd");

            var totalMembers = await _context.MemberRegistrations.CountAsync();
            var totalPlan = await _context.Plans.CountAsync();
            var todayRegistered = await _context.MemberRegistrations.Where(m => m.EnrolledDate == formattedToday).CountAsync();
            var planWithHighestCount = await _context.Plans.Select(p => new
            {
                Plan = p,
                MemberRegistrationCount = p.MemberRegistrations.Count()
            }).OrderByDescending(p => p.MemberRegistrationCount).FirstOrDefaultAsync();

            var totalEquipSum = await _context.Inventories
               .SumAsync(i => i.Quantity);
            var totalDefectSum = await _context.Inventories
                .SumAsync(i => i.Defect);

            var result = new DashboardDto
            {
                TotalMember = totalMembers,
                TotalPlan = totalPlan,
                TodayRegistered = todayRegistered,
                PlanWithHighestCount = planWithHighestCount.Plan.Name,
                TotalEquip = totalEquipSum,
                DefectEquip = totalDefectSum
            };
            return StatusCode(200, result);
        }
    }
}