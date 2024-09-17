using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using API.DTOs;
using API.DTOs.Member;
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

        [HttpGet("newRegistered")]
        public async Task<IActionResult> GetNewMembers()
        {
            var allMembers = await _context.MemberRegistrations
                .OrderByDescending(m => m.EnrolledDate).Take(3)
                .ToListAsync();
            return StatusCode(200, allMembers);
        }

        [HttpGet("top5Plans")]
        public async Task<IActionResult> getTopPlan()
        {
            var planWithHighestCount = await _context.Plans.Select(p => new
            {
                Plan = p,
                MemberRegistrationCount = p.MemberRegistrations.Count()
            }).OrderByDescending(p => p.MemberRegistrationCount).Take(5).ToListAsync();

            return StatusCode(200, planWithHighestCount);


        }

        [HttpGet("searchMember")]
        public async Task<IActionResult> GetSearchedMember(string searchQuery, int pageNumber = 1, int pageSize = 8)
        {

            var searchedMembers = await _context.MemberRegistrations.Where(member => member.MemberName.ToLower().Contains(searchQuery.ToLower()))
                                                                    .Skip((pageNumber - 1) * pageSize)
                                                                    .Take(pageSize).ToListAsync();

            var totalRecords = searchedMembers.Count();
            var sendMember = searchedMembers.Select(member => new MRegisterDTO
            {

                Id = member.Id,
                CardNo = member.CardNo,
                MemberName = member.MemberName,
                Contact = member.Contact,
                EnrolledDate = member.EnrolledDate,
                Price = member.Price,
                ExpiryDate = member.ExpiryDate,
                Email = member.Email,
                PlanId = member.PlanId,
                PlanName = member.PlanName
            });

            // Return the members along with pagination metadata
            var paginationResult = new
            {
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Members = sendMember
            };

            return Ok(paginationResult);

            return Ok(searchedMembers);
        }
    }
}