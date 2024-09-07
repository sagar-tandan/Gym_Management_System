using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using API.DTOs;
using API.DTOs.Member;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/member")]
    public class MemberController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public MemberController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterMember([FromBody] MRegisterDTO mRegisterDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Check if the Plan exists
            var plan = await _context.Plans.FindAsync(mRegisterDTO.PlanId);
            if (plan == null)
            {
                return NotFound("The selected plan does not exist.");
            }


            var newMember = new MemberRegistration
            {
                Id = mRegisterDTO.Id,
                CardNo = mRegisterDTO.CardNo,
                MemberName = mRegisterDTO.MemberName,
                Contact = mRegisterDTO.Contact,
                EnrolledDate = mRegisterDTO.EnrolledDate,
                Price = mRegisterDTO.Price,
                ExpiryDate = mRegisterDTO.ExpiryDate,
                Email = mRegisterDTO.Email,
                PlanId = mRegisterDTO.PlanId

            };


            try
            {
                await _context.MemberRegistrations.AddAsync(newMember);
                await _context.SaveChangesAsync();
                return Ok("The user is registered!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]

        public async Task<IActionResult> GetAllMembers()
        {
            var allMembers = await _context.MemberRegistrations.ToListAsync();
            if (allMembers == null)
            {
                return NotFound();
            }

            return Ok(allMembers);
        }




    }
}