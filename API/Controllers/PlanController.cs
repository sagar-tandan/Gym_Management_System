using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/plan")]
    public class PlanController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public PlanController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> getAllPlan(int pageNumber = 1, int pageSize = 8)
        {
            var totalRecords = await _context.Plans.CountAsync();

            var allData = await _context.Plans
                                        .OrderBy(p => p.Name)
                                        // .Include(p => p.MemberRegistrations)
                                        .Skip((pageNumber - 1) * pageSize)
                                        .Take(pageSize)
                                        .Select(plan => new
                                        {
                                            Name = plan.Name,
                                            DurationInMonths = plan.DurationInMonths,
                                            Cost = plan.Cost,
                                            MemberRegistrationCount = plan.MemberRegistrations.Count
                                        })
                                        .ToListAsync();

            if (allData == null)
            {
                return NotFound();
            }

            var paginationResult = new
            {
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Members = allData
            };

            return Ok(paginationResult);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlan([FromBody] PlanDto planDto)
        {
            var newPlan = new Plan
            {
                Name = planDto.Name,
                DurationInMonths = planDto.DurationInMonths,
                Cost = planDto.Cost,
            };

            try
            {
                await _context.Plans.AddAsync(newPlan);
                await _context.SaveChangesAsync();
                return Ok(newPlan);
            }
            catch (Exception e)
            {

                return BadRequest(e);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlan(int id, [FromBody] PlanDto planDto)
        {
            var PlanToBeUpdated = await _context.Plans.FindAsync(id);

            if (PlanToBeUpdated == null)
            {
                return NotFound();
            }
            PlanToBeUpdated.Name = planDto.Name;
            PlanToBeUpdated.Cost = planDto.Cost;
            PlanToBeUpdated.DurationInMonths = planDto.DurationInMonths;

            _context.Entry(PlanToBeUpdated).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(PlanToBeUpdated);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventory([FromRoute] int id)
        {
            var planToBeDeleted = await _context.Plans.FindAsync(id);
            if (planToBeDeleted == null)
            {
                return BadRequest();
            }
            _context.Plans.Remove(planToBeDeleted);
            await _context.SaveChangesAsync();

            return Ok(new { message = "The plan has been deleted Successfully!" });
        }

    }
}